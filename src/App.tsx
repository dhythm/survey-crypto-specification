import { Buffer } from "buffer";
import React from "react";
import "./App.css";
import { key } from "./credentials";
import logo from "./logo.svg";
import { encodeStrToBufferSource, importPublicKey } from "./utils";

const PUBLIC_OPENING_BOUNDARY = "-----BEGIN PUBLIC KEY-----";
const PUBLIC_CLOSING_BOUNDARY = "-----END PUBLIC KEY-----";

function App() {
  const [encodedText, setEncodedText] = React.useState("");
  React.useEffect(() => {
    const _f = async () => {
      const pubKey = await importPublicKey(
        key
          .replaceAll(/\n/gm, "")
          .replace(PUBLIC_OPENING_BOUNDARY, `${PUBLIC_OPENING_BOUNDARY}\n`)
          .replace(PUBLIC_CLOSING_BOUNDARY, `\n${PUBLIC_CLOSING_BOUNDARY}`)
      );
      const encrypted = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        pubKey,
        encodeStrToBufferSource("password1")
      );
      const encoded = Buffer.from(encrypted).toString("base64");
      // The following expression is same as encoded the above.
      const ctArray = Array.from(new Uint8Array(encrypted)); // ciphertext as byte array
      const ctStr = ctArray.map((byte) => String.fromCharCode(byte)).join(""); // ciphertext as string
      const ctBase64 = btoa(ctStr);
      console.log({
        encrypted,
        encoded,
        expression: encoded === ctBase64,
      });
      setEncodedText(encoded);
    };
    _f();
  }, []);

  // @ts-ignore
  const listener = (e) => {
    e.preventDefault();
    e.clipboardData.setData("text/plain", encodedText);
    document.removeEventListener("copy", listener);
  };

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
        <button
          onClick={async () => {
            document.addEventListener("copy", listener);
            document.execCommand("copy");
          }}
        >
          copy
        </button>
        <p
          style={{
            width: "80vw",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {encodedText}
        </p>
      </header>
    </div>
  );
}

export default App;
