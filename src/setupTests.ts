import "@testing-library/jest-dom";

if (typeof TextEncoder === "undefined") {
  class TextEncoderPolyfill {
    encode(input: string) {
      return new Uint8Array([...input].map((c) => c.charCodeAt(0)));
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).TextEncoder = TextEncoderPolyfill;
}

if (typeof TextDecoder === "undefined") {
  class TextDecoderPolyfill {
    decode(input: Uint8Array) {
      return String.fromCharCode(...input);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).TextDecoder = TextDecoderPolyfill;
}
