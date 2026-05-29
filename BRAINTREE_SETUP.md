# Braintree checkout setup

The shop page now includes Braintree Drop-in (PayPal + cards).  
Braintree **requires a small backend** — static GitHub Pages cannot generate client tokens alone.

## What was added to the site

1. **`<head>`** — Braintree Drop-in script loads first  
2. **Checkout form** — `#dropin-container` for PayPal/card UI  
3. **`shop.js`** — creates Drop-in when checkout opens, charges on **Make Purchase**

## What you must configure

Edit **`braintree-config.js`**:

```js
export const braintreeConfig = {
  clientTokenUrl: "https://YOUR_SERVER/braintree-client-token",
  checkoutUrl: "https://YOUR_SERVER/braintree-checkout"
};
```

### Endpoint 1: `clientTokenUrl` (GET or POST)

Returns JSON:

```json
{ "clientToken": "eyJ..." }
```

Generate with Braintree server SDK (`gateway.clientToken.generate`).

### Endpoint 2: `checkoutUrl` (POST)

Receives:

```json
{
  "paymentMethodNonce": "...",
  "amount": "54.99",
  "order": { ... }
}
```

Server runs `transaction.sale` with the nonce and amount, then returns:

```json
{ "success": true, "transactionId": "abc123" }
```

## Firestore

Successful orders are saved to **`orders`** when Firebase is configured.  
Add rules:

```
match /orders/{document=**} {
  allow create: if true;
  allow read, update, delete: if request.auth != null;
}
```

## Sandbox testing

1. Create account at [Braintree Sandbox](https://sandbox.braintreegateway.com/)
2. Deploy token + checkout endpoints (Firebase Functions, Netlify, Render, etc.)
3. Paste URLs into `braintree-config.js`
4. Use Braintree test card `4111111111111111` or sandbox PayPal

## Without backend yet

Drop-in will show: **"Set braintreeConfig.clientTokenUrl"** until you add a token endpoint.
