// No 0/O/1/I so refs are easy to read out and type from a bank narration.
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function makeRef(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return "SL-" + Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}
