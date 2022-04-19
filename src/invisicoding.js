function getKey() {
  // Numbers represent character codes of invisible characters
  return [8203, 8299, 8291, 8297, 8236, 8234, 8296, 8300, 8298, 8302];
  /**
   * To visualize or debug encoded text, you can use the following
   * key instead which will instead print numbers 0-9 instead of invisible characters.
   *
   * return [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
   */
}

function encode(text, secret) {
  let encT = "";
  let raw = 0;
  let enc = 0;
  while (raw < text.length || enc < secret.length) {
    encT += text.charAt(raw++);
    encT += encodeCharToSecret(secret.charAt(enc++));
  }

  return encT;
}

function encodeCharToCode(char) {
  return char.charCodeAt(0) - 31;
}

function encodeCharToSecret(char) {
  if (char == "") {
    return "";
  }
  if (char.length > 1) {
    throw new Error("Expected a single character, got multiple");
  }
  const code = encodeCharToCode(char);
  const secretCharacterA = String.fromCharCode(getKey()[Math.floor(code / 10)]);
  const secretCharacterB = String.fromCharCode(getKey()[code % 10]);
  return secretCharacterA + secretCharacterB;
}

function decodeChar(charCodeA, charCodeB) {
  const codeA = getKey().indexOf(charCodeA);
  const codeB = getKey().indexOf(charCodeB);
  return decodeCharFromCodes(codeA, codeB);
}

function decodeCharFromCodes(codeA, codeB) {
  return String.fromCharCode(codeA * 10 + codeB + 31);
}

function decode(text) {
  let secret = "";
  for (let i = 1; i < text.length; i++) {
    const charCode = text.charAt(i).charCodeAt(0);
    if (getKey().indexOf(charCode) !== -1) {
      secret += decodeChar(charCode, text.charAt(++i).charCodeAt(0));
    }
  }
  return secret;
}

module.exports = {
  encode,
  encodeCharToCode,
  encodeCharToSecret,
  decode,
  decodeChar,
  decodeCharFromCodes,
  getKey,
};
