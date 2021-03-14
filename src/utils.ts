// from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
export function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  //   const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  //   const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function importPublicKey(pem: string) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  );
  // base64 decode the string to get the binary data
  const binaryDerString = atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);
  //   const binaryDer = encodeBufferSource(binaryDerString);

  return crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
}

export function encodeStrToBufferSource(str: string) {
  const enc = new TextEncoder();
  return enc.encode(str);
}

export function decodeArrayBufferToString(buf: ArrayBuffer) {
  const dec = new TextDecoder();
  return dec.decode(buf);
}

export async function importPrivateKey(pkcs8Pem: string) {
  return await crypto.subtle.importKey(
    "pkcs8",
    getPkcs8Der(pkcs8Pem),
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
}

function getPkcs8Der(pkcs8Pem: string) {
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  var pemContents = pkcs8Pem.substring(
    pemHeader.length,
    pkcs8Pem.length - pemFooter.length
  );
  var binaryDerString = atob(pemContents);
  return str2ab(binaryDerString);
}

// export function ab2str(buf: any) {
//   return String.fromCharCode.apply(null, new Uint16Array(buf) as number[]);
// }

export function str2abU16(str: string) {
  let buf = new ArrayBuffer(str.length * 2);
  let bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
