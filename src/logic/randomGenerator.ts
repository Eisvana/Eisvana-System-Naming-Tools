// from https://www.w3schools.com/js/js_random.asp
// this JavaScript function always returns a random number between min (included) and max (excluded):
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
