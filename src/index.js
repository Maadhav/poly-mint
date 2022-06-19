import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Web3 from "web3/dist/web3.min.js";
import { Web3ReactProvider } from "@web3-react/core";

function getLibrary(provider) {
  const library = new Web3(provider);
  library.pollingInterval = 12000;
  return library;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>
);
