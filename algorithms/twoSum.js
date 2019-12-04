// Return indices for two elements that sum up to the target
// Each function receives an array of integers and a target
// Iterate all elements in the array and return array with indices
// e.g. [2, 7, 11, 15], target = 9 -> [0, 1]

const twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
