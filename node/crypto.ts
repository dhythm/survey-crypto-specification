// import constants from "constants";
import crypto from "crypto";
import { key } from "../credentials/key";
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

const data = encrypt(
  key.replace(/\\n/gm, ""),
  Buffer.from("password1", "utf-8")
);

console.log({ data: Buffer.from(data).toString("base64") });
