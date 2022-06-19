import { UAuthConnector } from "@uauth/web3-react";
import { InjectedConnector } from "@web3-react/injected-connector";

// Instanciate your other connectors.
export const injected = new InjectedConnector({ supportedChainIds: [80001] });

export const uauth = new UAuthConnector({
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scope: "openid wallet",
  connectors: { injected },
});

export default uauth;
