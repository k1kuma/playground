/*
This week's question:
Given an integer array nums, sum each element in the array in order.
You are allowed to use at most one reset during the run: when you reset,
your current score becomes 0 and you continue with the next elements.
Return the maximum score you can end with.
*/

function maxScoreWithOneReset(nums) {
  let maxWithoutReset = 0;
  let maxWithReset = 0; 

  for (const num of nums) {
    maxWithReset = Math.max(maxWithReset + num, maxWithoutReset + num);
    maxWithoutReset = Math.max(maxWithoutReset + num, 0);
  }

  return Math.max(maxWithoutReset, maxWithReset);
}


/*
Examples:
> maxScoreWithOneReset([2, -1, 2, -5, 2, 2]) // reset after -5
> 4

> maxScoreWithOneReset([4, -10, 3, 2, -1, 6]) // reset after -10
> 10

> maxScoreWithOneReset([-50, -2, -3]) // reset after -3
> 0
*/

console.log(maxScoreWithOneReset([2, -1, 2, -5, 2, 2]) === 4);
console.log(maxScoreWithOneReset([4, -10, 3, 2, -1, 6]) === 10);
console.log(maxScoreWithOneReset([-50, -2, -3]) === 0);
