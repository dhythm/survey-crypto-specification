import React from "react";
import "./App.css";
import { key } from "./credentials";
import logo from "./logo.svg";
import { importPublicKey, str2ab } from "./utils";

const PUBLIC_OPENING_BOUNDARY = "-----BEGIN PUBLIC KEY-----";
const PUBLIC_CLOSING_BOUNDARY = "-----END PUBLIC KEY-----";

function App() {
  React.useEffect(() => {
    const _f = async () => {
      const pubKey = await importPublicKey(
        key
          .replaceAll(/\n/gm, "")
          .replaceAll(PUBLIC_OPENING_BOUNDARY, `${PUBLIC_OPENING_BOUNDARY}\n`)
          .replaceAll(PUBLIC_CLOSING_BOUNDARY, `\n${PUBLIC_CLOSING_BOUNDARY}`)
      );
      const encrypted = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        pubKey,
        str2ab("password1")
      );
      const encoded = Buffer.from(encrypted).toString("base64");
      console.log({ encoded });
    };
    _f();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
