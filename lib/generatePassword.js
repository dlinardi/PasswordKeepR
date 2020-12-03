/* Generate a STRONG password STRING,
Takes in parameters to adjust pwd options
ie No symbols, no upper ,no lower
and max length

- DEFAULT will be max strength with length of 64
Symbols does not include escape char '\'
*/

const randomInt = require('random-int');

const generatePassword = (inputLength = 64, allowLowerCase = true, allowUpperCase = true, allowDigits = true, allowSymbols = false) => {

  let output = [];

  const charset = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    digits: '1234567890',
    symbols: `!"#$%&'()*+,-./:;<=>?@[]^_{|}~`
  };

  // Check Character Options >> True get dded to Chars
  let chars = [];
  if (allowLowerCase) {
    for (let i = 0; i < charset.lower.length; i++) {
      chars.push(charset.lower.charAt(i));
    }
  }
  if (allowUpperCase) {
    for (let i = 0; i < charset.upper.length; i++) {
      chars.push(charset.upper.charAt(i));
    }
  }
  if (allowDigits) {
    for (let i = 0; i < charset.digits.length; i++) {
      chars.push(charset.digits.charAt(i));
    }
  }
  if (allowSymbols) {
    for (let i = 0; i < charset.symbols.length; i++) {
      chars.push(charset.symbols.charAt(i));
    }
  }

  //Error Checking, will not allow empty charset
  if (chars.length === 0) {
    return null;
  }
  //Generate String
  for (let i = 0; i < inputLength; i++) {
    const charPosn = randomInt(0, chars.length - 1);
    output.push(chars[charPosn]); // Array
  }
  //Output as String
  output = output.join("");
  return output;
};

module.exports = generatePassword;
