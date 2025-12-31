/*
An alternating array is a list of any length in which two
(not necessarily different) values are alternating
(all even-indexed items are equal, and all odd-indexed items are equal).

Given an array, return true if it is alternating.
*/

function isAlternatingArray(arr) {
  if (!arr) return false;
  if (arr.length <= 2) return true;

  const first = arr[0];
  const second = arr[1];

  for (let i = 2; i < arr.length; i++) {
    if (i % 2 === 0 && arr[i] !== first) return false;
    if (i % 2 === 1 && arr[i] !== second) return false;
  }

  return true;
}

console.log(isAlternatingArray([]) === true);
console.log(isAlternatingArray([1]) === true);
console.log(isAlternatingArray([1, 1]) === true);
console.log(isAlternatingArray([1, 2, 1]) === true);
console.log(isAlternatingArray([10, 5, 10, 5, 10]) === true);
console.log(isAlternatingArray([2, 2, 3, 3]) === false);
console.log(isAlternatingArray([5, 4, 3, 5, 4, 3]) === false);
