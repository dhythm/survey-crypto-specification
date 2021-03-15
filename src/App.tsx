import { Buffer } from "buffer";
import React from "react";
import "./App.css";
import { privateKey, publicKey } from "./key";
import logo from "./logo.svg";
import {
  encodeStrToBufferSource,
  importPrivateKey,
  importPublicKey,
} from "./utils";

const PUBLIC_OPENING_BOUNDARY = "-----BEGIN PUBLIC KEY-----";
const PUBLIC_CLOSING_BOUNDARY = "-----END PUBLIC KEY-----";

function App() {
  const [encodedText, setEncodedText] = React.useState("");
  React.useEffect(() => {
    const _f = async () => {
      const pubKey = await importPublicKey(
        // key
        //   .replaceAll(/\n/gm, "")
        //   .replace(PUBLIC_OPENING_BOUNDARY, `${PUBLIC_OPENING_BOUNDARY}\n`)
        //   .replace(PUBLIC_CLOSING_BOUNDARY, `\n${PUBLIC_CLOSING_BOUNDARY}`)
        publicKey
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

      const priKey = await importPrivateKey(privateKey);
      const decrypted = await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        priKey,
        encrypted
      );

      console.log({
        encrypted,
        encoded,
        expression: encoded === ctBase64,
        decrypted: Buffer.from(decrypted).toString("utf-8"),
        decryptedFromBase64Str: Buffer.from(
          await crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            priKey,
            Buffer.from(
              "NJqbcoQdFH4Ca9RUxs+LBHugT7GvUioPb6lJc3Y+LhIwLlxD9a+eOWKL5dlNn/UYINfHeeWJIr9byd7/WrKMn25/soMqXcIlVruvyQAE6miEJUzwII+fvzY88qEgOr5J1z6bbQAkR0/x5j6JdWO7V5JRO19Br1CiI0vN71qg3EdB+B6GrXxJXTEzugGRQzRmXwV+TztsFZu1ZIo5Q6qgF3C3IA8P6IWNxkKI732FdmPadobpcwhdFHtiNrdqm7y1sBIsH7JQbsC+K6XDKFhRaD1+RbJ3XNA6qrtNLKupe3BNi2N8BDfHZ89vtk4tkg1zwCsDAqfsujOfvp+nUjvW9Q==",
              "base64"
            )
          )
        ).toString("utf-8"),
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
