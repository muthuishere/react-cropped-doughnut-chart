export function getRandomSixDigitString() {
  const str = "" + Math.floor(Math.random() * (999999 - 1)) + 1;
  return str.padStart(6, "0");
}
