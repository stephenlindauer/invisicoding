const {
  getKey,
  encode,
  encodeCharToCode,
  encodeCharToSecret,
  decode,
  decodeChar,
  decodeCharFromCodes,
} = require("../invisicoding");

test("single character to code", () => {
  expect(encodeCharToCode(" ")).toBe(1);
  expect(encodeCharToCode("0")).toBe(17);
  expect(encodeCharToCode("~")).toBe(95);
});

test("single character to secret character", () => {
  const secret = encodeCharToSecret(" ");
  expect(secret.charAt(0)).toBe(String.fromCharCode(getKey()[0]));
  expect(secret.charAt(1)).toBe(String.fromCharCode(getKey()[1]));
  const secret2 = encodeCharToSecret("0");
  expect(secret2.charAt(0)).toBe(String.fromCharCode(getKey()[1]));
  expect(secret2.charAt(1)).toBe(String.fromCharCode(getKey()[7]));
  const secret3 = encodeCharToSecret("~");
  expect(secret3.charAt(0)).toBe(String.fromCharCode(getKey()[9]));
  expect(secret3.charAt(1)).toBe(String.fromCharCode(getKey()[5]));

  expect(encodeCharToSecret("")).toBe(""); // empty returns empty
  expect(() => encodeCharToSecret("ZZ")).toThrow(); // 2 characters throws error
});

test("encode a string of text", () => {
  const encoded = encode("This is readable", "Secr3t");
  expect(encoded.length).toBe(16 + 12); // 16 original characters + 6 hidden characters x 2
  expect(encoded).toBe("T‪⁣h⁬​i⁨⁪s⁪⁩ ⁣​i⁪‪s readable"); // This will change if key is changed
});

test("decode character from 2 character codes", () => {
  expect(decodeCharFromCodes(0, 1)).toBe(" ");
  expect(decodeCharFromCodes(1, 7)).toBe("0");
  expect(decodeCharFromCodes(9, 5)).toBe("~");
});

test("decode character from 2 invisible characters", () => {
  expect(decodeChar(getKey()[0], getKey()[1])).toBe(" ");
  expect(decodeChar(getKey()[1], getKey()[7])).toBe("0");
  expect(decodeChar(getKey()[9], getKey()[5])).toBe("~");
});

test("decode string", () => {
  expect(decode(encode("This is readable", "Secr3t"))).toBe("Secr3t");
  expect(decode(encode("short", "Longer secret"))).toBe("Longer secret");
});
