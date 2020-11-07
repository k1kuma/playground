// Complete the isValid function below.
/*
SHERLOCK AND THE VALID STRING

Sherlock considers a string to be valid if all characters of the string appear the same number of times. It is also valid if he can remove just  character at  index in the string, and the remaining characters will occur the same number of times. Given a string , determine if it is valid. If so, return YES, otherwise return NO.

For example, if , it is a valid string because frequencies are . So is  because we can remove one  and have  of each character in the remaining string. If  however, the string is not valid as we can only remove  occurrence of . That would leave character frequencies of .

Function Description

Complete the isValid function in the editor below. It should return either the string YES or the string NO.

isValid has the following parameter(s):

s: a string
Input Format

A single string .

Constraints

Each character 
Output Format

Print YES if string  is valid, otherwise, print NO.

Sample Input 0

aabbcd
Sample Output 0

NO
Explanation 0

Given , we would need to remove two characters, both c and d  aabb or a and b  abcd, to make it valid. We are limited to removing only one character, so  is invalid.

Sample Input 1

aabbccddeefghi
Sample Output 1

NO
Explanation 1

Frequency counts for the letters are as follows:

{'a': 2, 'b': 2, 'c': 2, 'd': 2, 'e': 2, 'f': 1, 'g': 1, 'h': 1, 'i': 1}

There are two ways to make the valid string:

Remove  characters with a frequency of : .
Remove  characters of frequency : .
Neither of these is an option.

Sample Input 2

abcdefghhgfedecba
Sample Output 2

YES
Explanation 2

All characters occur twice except for  which occurs  times. We can delete one instance of  to have a valid string.
*/
function isValid(s) {
  let sObj = new Map();
  let countObj = new Map();
  
  // Create Obj
  for (let i=0; i<s.length; i++) {
    if (!sObj[s[i]]) {
      sObj[s[i]] = 1;
    } else {
      sObj[s[i]]++;
    }
  }

  // Could create an array out of the keys as we no longer care about the value.
  const values = Object.values(sObj);
  if (values.length == 1) {
    // String with only one set of characters is automatically valid.
    return "YES";
  }
  
  let counts = {};
  for (let j=0; j<values.length; j++) {
    // New count found in sObj map, add to countObj.
    if (!countObj[values[j]]) {
      countObj[values[j]] = 1;
    } else {
      countObj[values[j]]++;
    }
  }
  
  // Work with countObj to determine if this is a Sherlock valid string.
  console.log(sObj);      // Map { a: 2, b: 2, c: 2, d: 2, e: 3, f: 2, g: 2, h: 2 }
  console.log(countObj);  // Map { '2': 7, '3': 1 }

  if (countObj.size > 2 || countObj[1] > 1) {
    return "NO";
  } else if (countObj.size == 1) {
    return "YES";
  }
  
  // Just need to handle scenario where we can strip one character to string/
  // and re-validate.
  // Return "YES" if there are any counts of 1 in countObj.
  const cOK = Object.keys(countObj);
  const cOV = Object.values(countObj);
  
  // At this point, if there is a 1 count of 1, removing it should
  // make it eligible.
  if (countObj[1] && countObj[1] == 1) {
    return "YES";
  }

  if (Math.abs(cOK[0]-cOK[1]) != 1) {
    return "NO";  
  }
  
  // Reaching here indicates we are only off by 1.
  if (cOK[0] > cOK[1] && cOV[0] > 1 ) {
    return "NO";
  }

  if (cOK[1] > cOK[0] && cOV[1] > 1 ) {
    return "NO";
  }  

  return "NO"
}
