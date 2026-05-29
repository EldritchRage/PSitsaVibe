// Braintree needs a server-generated client token (never hard-code production tokens).
// Point this to your backend endpoint that returns: { "clientToken": "..." }
//
// Examples after you deploy a token endpoint:
//   Firebase Function: https://us-central1-YOUR_PROJECT.cloudfunctions.net/braintreeClientToken
//   Netlify function:  /.netlify/functions/braintree-client-token

export const braintreeConfig = {
  clientTokenUrl: "",
  checkoutUrl: ""
};
