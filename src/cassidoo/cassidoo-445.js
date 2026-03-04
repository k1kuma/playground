/* Given an array of integers, find the contiguous subarray that has the largest sum
and return that sum. A subarray must contain at least one element.
If all elements are negative, return the largest (least negative) value.
If you need a hint, look up Kadane's Algorithm!
*/

function maxSubarraySum(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubarraySum([5]));
console.log(maxSubarraySum([-1, -2, -3, -4]));
console.log(maxSubarraySum([5, 4, -1, 7, 8]));

/*
Examples:

> maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])
6
> maxSubarraySum([5])
5
> maxSubarraySum([-1, -2, -3, -4])
-1
> maxSubarraySum([5, 4, -1, 7, 8])
23
*/
