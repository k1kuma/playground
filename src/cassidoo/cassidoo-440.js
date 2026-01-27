/*
***** REVIEW IN FUTURE *****

This week's question:
Given a string str, find a contiguous substring of length 10 whose characters can be bijectively mapped to the moves
{U,D,L,R,B,A} so that the substring decodes to the Konami code "UUDDLRLRBA"
(a character always maps to the same move, and two different moves can’t share a character).
Return a valid mapping as an object.

*/

function konamiMapping(str) {
  const target = "UUDDLRLRBA";
  const targetCounts = {};

  for (const char of target) {
    targetCounts[char] = (targetCounts[char] || 0) + 1;
  }

  for (let i = 0; i <= str.length - 10; i++) {
    const substring = str.slice(i, i + 10);
    const charToMove = {};
    const moveToChar = {};
    let isValid = true;

    for (let j = 0; j < 10; j++) {
      const char = substring[j];
      const move = target[j];

      if (charToMove[char] && charToMove[char] !== move) {
        isValid = false;
        break;
      }
      if (moveToChar[move] && moveToChar[move] !== char) {
        isValid = false;
        break;
      }

      charToMove[char] = move;
      moveToChar[move] = char;
    }

    if (isValid && Object.keys(charToMove).length === Object.keys(moveToChar).length) {
      return Object.fromEntries(Object.entries(charToMove).map(([k, v]) => [k, v]));
    }
  }

  return null; // No valid mapping found
}

/*
Example:

konamiMapping("xx2233454590yy11110")
> { "0": "A", "2": "U", "3": "D", "4": "L", "5": "R", "9": "B" }

konamiMapping("sduwahoda22ii0d0dbn")
> { "0": "L", "2": "U", "i": "D", "d": "R", "b": "B", "n": "A" }
*/

console.log(konamiMapping("xx2233454590yy11110"))
console.log(konamiMapping("sduwahoda22ii0d0dbn"))