// Deploy as a Cloudflare Worker: wrangler deploy
// Secrets: STRIPE_SECRET_KEY. Vars: ALLOWED_ORIGIN, FIREBASE_PROJECT_ID.

let firebaseJwks;

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const bytes = Uint8Array.from(atob(normalized), (char) => char.charCodeAt(0));
  return bytes;
}

async function verifyFirebaseToken(token, projectId) {
  if (typeof token !== "string" || token.split(".").length !== 3) return null;
  const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
  const header = JSON.parse(new TextDecoder().decode(decodeBase64Url(encodedHeader)));
  const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(encodedPayload)));
  const now = Math.floor(Date.now() / 1000);
  if (header.alg !== "RS256" || !header.kid || payload.aud !== projectId ||
      payload.iss !== `https://securetoken.google.com/${projectId}` ||
      payload.exp <= now || payload.iat > now || !payload.sub) return null;

  if (!firebaseJwks) {
    const response = await fetch("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");
    if (!response.ok) throw new Error("Firebase signing keys unavailable");
    firebaseJwks = await response.json();
  }
  const jwk = firebaseJwks.keys?.find((key) => key.kid === header.kid);
  if (!jwk) {
    firebaseJwks = null;
    return null;
  }
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    decodeBase64Url(encodedSignature),
    new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
  );
  return valid ? payload : null;
}

async function stripeRequest(path, env, options = {}) {
  return fetch(`https://api.stripe.com/v1/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      ...(options.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      ...options.headers,
    },
  });
}

async function stripeCustomerForFirebaseUser(user, env) {
  const query = `metadata['firebase_uid']:'${user.sub.replace(/'/g, "")}'`;
  const search = await stripeRequest(`customers/search?query=${encodeURIComponent(query)}&limit=1`, env);
  const searchBody = await search.json();
  if (!search.ok) throw new Error(searchBody.error?.message || "Stripe customer lookup failed");
  if (searchBody.data?.[0]?.id) return searchBody.data[0].id;

  const params = new URLSearchParams({
    email: user.email || "",
    name: user.name || "",
    "metadata[firebase_uid]": user.sub,
  });
  const created = await stripeRequest("customers", env, { method: "POST", body: params.toString() });
  const customer = await created.json();
  if (!created.ok || !customer.id) throw new Error(customer.error?.message || "Stripe customer creation failed");
  return customer.id;
}

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
    }

    try {
      const body = await request.json();
      const { line_items, success_url, cancel_url, firebase_id_token } = body;

      if (!Array.isArray(line_items) || line_items.length === 0) {
        return Response.json({ error: "No items provided" }, { status: 400, headers: corsHeaders });
      }

      if (line_items.length > 50) {
        return Response.json({ error: "Too many items" }, { status: 400, headers: corsHeaders });
      }

      const sanitizedItems = line_items.map((item) => {
        if (!item.price_id || typeof item.price_id !== "string") {
          throw new Error("Invalid price_id");
        }
        if (!item.price_id.startsWith("price_")) {
          throw new Error("Invalid price_id format");
        }
        const qty = Math.floor(Number(item.quantity));
        if (!qty || qty < 1 || qty > 99) {
          throw new Error("Invalid quantity");
        }
        return { price: item.price_id, quantity: qty };
      });

      for (const item of sanitizedItems) {
        const priceRes = await stripeRequest(`prices/${item.price}?expand%5B%5D=product`, env);
        if (!priceRes.ok) {
          return Response.json(
            { error: `Invalid price: ${item.price}` },
            { status: 400, headers: corsHeaders }
          );
        }
        const price = await priceRes.json();
        let productActive = price.product?.active === true;
        if (typeof price.product === "string") {
          const productRes = await stripeRequest(`products/${price.product}`, env);
          productActive = productRes.ok && (await productRes.json()).active === true;
        }
        if (price.active !== true || !productActive) {
          return Response.json(
            { error: "An item in your cart is no longer available" },
            { status: 400, headers: corsHeaders }
          );
        }
      }

      const params = new URLSearchParams();
      params.append("mode", "payment");
      params.append("success_url", success_url || `${env.ALLOWED_ORIGIN}/checkout-success.html?session_id={CHECKOUT_SESSION_ID}`);
      params.append("cancel_url", cancel_url || `${env.ALLOWED_ORIGIN}/checkout-cancel.html`);
      params.append("shipping_address_collection[allowed_countries][0]", "US");
      params.append("phone_number_collection[enabled]", "true");
      params.append("billing_address_collection", "auto");

      const projectId = env.FIREBASE_PROJECT_ID || "good-knight-boutique";
      const firebaseUser = firebase_id_token
        ? await verifyFirebaseToken(firebase_id_token, projectId)
        : null;
      if (firebase_id_token && !firebaseUser) {
        return Response.json({ error: "Your sign-in session expired. Please sign in again or continue as a guest." }, { status: 401, headers: corsHeaders });
      }
      if (firebaseUser) {
        const customerId = await stripeCustomerForFirebaseUser(firebaseUser, env);
        params.append("customer", customerId);
        params.append("client_reference_id", firebaseUser.sub);
        params.append("customer_update[name]", "auto");
        params.append("customer_update[address]", "auto");
        params.append("customer_update[shipping]", "auto");
      } else {
        params.append("customer_creation", "always");
      }

      sanitizedItems.forEach((item, i) => {
        params.append(`line_items[${i}][price]`, item.price);
        params.append(`line_items[${i}][quantity]`, item.quantity);
      });

      const sessionRes = await stripeRequest("checkout/sessions", env, {
        method: "POST",
        body: params.toString()
      });

      const session = await sessionRes.json();
      if (!sessionRes.ok) {
        return Response.json(
          { error: session.error?.message || "Failed to create session" },
          { status: 500, headers: corsHeaders }
        );
      }

      return Response.json({ url: session.url }, { headers: corsHeaders });
    } catch (err) {
      return Response.json(
        { error: err.message || "Internal server error" },
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
