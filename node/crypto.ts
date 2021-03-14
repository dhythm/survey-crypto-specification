// import constants from "constants";
import crypto from "crypto";
import { key, privateKey, publicKey } from "../credentials/key";
const constants = require("constants");

function encrypt(key: string, data: NodeJS.ArrayBufferView) {
  return crypto.publicEncrypt(
    {
      key,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
    },
    data
  );
}

function decrypt(key: string, data: NodeJS.ArrayBufferView) {
  return crypto.privateDecrypt(key, data);
}

// function ab2str(buf) {
//   return String.fromCharCode.apply(null, new Uint16Array(buf));
// }

function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

const data = encrypt(key, Buffer.from("password1", "utf-8"));
const encrypted = encrypt(publicKey, Buffer.from("password1", "utf-8"));
const decrypted = decrypt(privateKey, encrypted);

console.log({
  data: Buffer.from(data).toString("base64"),
  encrypted: Buffer.from(encrypted).toString("base64"),
  decrypted: Buffer.from(decrypted).toString("utf-8"),
  decryptedFromBase64Str: Buffer.from(
    decrypt(
      privateKey,
      Buffer.from(
        // "NJqbcoQdFH4Ca9RUxs+LBHugT7GvUioPb6lJc3Y+LhIwLlxD9a+eOWKL5dlNn/UYINfHeeWJIr9byd7/WrKMn25/soMqXcIlVruvyQAE6miEJUzwII+fvzY88qEgOr5J1z6bbQAkR0/x5j6JdWO7V5JRO19Br1CiI0vN71qg3EdB+B6GrXxJXTEzugGRQzRmXwV+TztsFZu1ZIo5Q6qgF3C3IA8P6IWNxkKI732FdmPadobpcwhdFHtiNrdqm7y1sBIsH7JQbsC+K6XDKFhRaD1+RbJ3XNA6qrtNLKupe3BNi2N8BDfHZ89vtk4tkg1zwCsDAqfsujOfvp+nUjvW9Q==",
        "XOXHtoswcJT9t8+UDPP5AU9v9bLeOo7MuNRPWMDBPdQ+kdzmY5i3BokdIMVSE+lVpBeCsyOgY2VypIOvBZr8ZqOHp124Zbxl9MIioBXhrCysbHf133NYoizbvtu41bspxHl3C+XOhUlYD0EFL+rr+ZKJw8kNOgWbQvybzmhu4iqN4PhitZTOJRTrj2gkFmxhj+xIRUhVdo8pldQoHsO9ZDGHdNkfndNs1imnI0D1VtC5TENWo3TdDBpmDDIWHM8+8XHtPNKy1OgPbzC7SqzMKLk2xuvAqcdzJCPUD+vu0aqoO5Erbx66hvTI3tYHJ4H2fBTiXbUULIDkYNKi0BNKRQ==",
        "base64"
      )
    )
  ).toString("utf-8"),
});
