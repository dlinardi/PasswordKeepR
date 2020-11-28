/* Generate a STRONG password STRING,
Takes in parameters to adjust pwd options
ie No symbols, no upper ,no lower
and max length

- DEFAULT will be max strength...
Max length, and variety

Options will be booleans


Not going to use b/c it only looks random Math.random().toString(36).substring(2, 8);  -- Super Nerds can predict it

UTF8 > Pwd Length = x, generate x UTF8 Chars (hex) > translate to display (should be true random)
 > Can charsets be excluded by range?  ie a-z is range x A-Z is range y etc...

 Show Bits of Entropy
 https://advancedweb.hu/what-is-the-optimal-password-length/

 Recommends 112 bits of Entripy  (22 Chars w/ only upper and lower ltrs)r
*/

const randomInt = require('random-int');

const generatePassword = (inputLength, lwrCase, upCase, numbers, symbolsSwitch) => {
  let output = [];
  // PARAMS length, lwrCase, upCase, numbers, symbols
  // Update Intial Vals w. User Options
  //Production Defualt should be 64
  // Need to hand optoins better >> ?? Are they going to be coming in as an object?
  let length = 64;
  let allowLowerCase = true;
  let allowUpperCase = true;
  let allowNumbers = true;
  let allowSymbols = true;

  // Charsets
  const charset = {
    1: 'abcdefghijklmnopqrstuvwxyz',
    2: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    3: '1234567890',
    4: `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`
  }
// Options >> Create new array / string based on options
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '1234567890'
  const symbols = `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`

  //Generate String
  for (let i = 0; i < length; i++) {
    //Random Num to choose charset (1-4)
    chars = charset[randomInt(1, 4)]
    //Based on length of string (range), pick random index > Push char output
    const charPosn = randomInt(0, chars.length - 1);
    output.push(chars.charAt(charPosn))
  }
  //JOIN OUPUT to make 1 string
  output = output.join("")
  return output
};

console.log(generatePassword());
// const randomInt = require('random-int');

// console.log(randomInt(1,4));
// //=> 3

// console.log(randomInt(1, 26));
