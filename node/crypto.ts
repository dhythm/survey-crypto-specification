// import constants from "constants";
import crypto from "crypto";
import { privateKey, publicKey } from "./key";
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

// const data = encrypt(key, Buffer.from("password1", "utf-8"));
const encrypted = encrypt(publicKey, Buffer.from("password1", "utf-8"));
const decrypted = decrypt(privateKey, encrypted);

console.log({
  //   data: Buffer.from(data).toString("base64"),
  encrypted: Buffer.from(encrypted).toString("base64"),
  decrypted: Buffer.from(decrypted).toString("utf-8"),
  decryptedFromBase64Str: Buffer.from(
    decrypt(
      privateKey,
      Buffer.from(
        "XOXHtoswcJT9t8+UDPP5AU9v9bLeOo7MuNRPWMDBPdQ+kdzmY5i3BokdIMVSE+lVpBeCsyOgY2VypIOvBZr8ZqOHp124Zbxl9MIioBXhrCysbHf133NYoizbvtu41bspxHl3C+XOhUlYD0EFL+rr+ZKJw8kNOgWbQvybzmhu4iqN4PhitZTOJRTrj2gkFmxhj+xIRUhVdo8pldQoHsO9ZDGHdNkfndNs1imnI0D1VtC5TENWo3TdDBpmDDIWHM8+8XHtPNKy1OgPbzC7SqzMKLk2xuvAqcdzJCPUD+vu0aqoO5Erbx66hvTI3tYHJ4H2fBTiXbUULIDkYNKi0BNKRQ==",
        "base64"
      )
    )
  ).toString("utf-8"),
});
