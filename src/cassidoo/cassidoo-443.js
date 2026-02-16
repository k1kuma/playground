function moveNums(nums, n) {
  let writeIndex = 0;

  // First pass: move all non-n elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== n) {
      nums[writeIndex] = nums[i];
      writeIndex++;
    }
  }

  // Second pass: fill remaining positions with n
  while (writeIndex < nums.length) {
    nums[writeIndex] = n;
    writeIndex++;
  }

  return nums;
}

console.log(moveNums([0,2,0,3,10], 0));
