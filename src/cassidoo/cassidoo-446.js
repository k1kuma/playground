/*
Find the majority element in an array (one that appears more than n/2 times)
in O(n) time and O(1) space without hashmaps.
Hint: the Boyer-Moore Voting algorithm might help if you can't figure this one out!
*/

function majorityElement(nums) {
  let count = 0;
  let candidate = null;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}

// > majorityElement([2, 2, 1, 1, 2, 2, 1, 2, 2])
// 2

// > majorityElement([3, 3, 4, 2, 3, 3, 1])
// 3

console.log(majorityElement([2, 2, 1, 1, 2, 2, 1, 2, 2]));
console.log(majorityElement([3, 3, 4, 2, 3, 3, 1]));
console.log(majorityElement([2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1]));
