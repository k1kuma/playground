/*
Given a string s consisting only of 'a' and 'b',
you may swap adjacent characters any number of times.
Return the minimum number of adjacent swaps needed to transform s
into an alternating string, either "ababab..." or "bababa...",
or return -1 if it's impossible.
*/

function minSwapsToAlternate(s) {
  const countA = [...s].filter(c => c === 'a').length;
  const countB = s.length - countA;

  if (Math.abs(countA - countB) > 1) {
    return -1;
  }

  const countSwaps = (arr, target) => {
    let swaps = 0;
    const temp = [...arr];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i] !== target[i]) {
        // Find the nearest matching character
        let j = i + 1;
        while (j < temp.length && temp[j] !== target[i]) {
          j++;
        }
        // Bubble it to position i
        while (j > i) {
          [temp[j], temp[j - 1]] = [temp[j - 1], temp[j]];
          j--;
          swaps++;
        }
      }
    }

    return swaps;
  };

  const target1 = 'ab'.repeat(Math.ceil(s.length / 2)).slice(0, s.length);
  const target2 = 'ba'.repeat(Math.ceil(s.length / 2)).slice(0, s.length);

  const swaps1 = countA === countB || countA > countB ? countSwaps([...s], target1) : Infinity;
  const swaps2 = countA === countB || countB > countA ? countSwaps([...s], target2) : Infinity;

  return Math.min(swaps1, swaps2);
}

/*
minSwapsToAlternate('aabb') === 1
minSwapsToAlternate('aaab') === -1
minSwapsToAlternate('aaaabbbb') === 6
*/

console.log(minSwapsToAlternate('aabb'));
console.log(minSwapsToAlternate('aaab'));
console.log(minSwapsToAlternate('aaaabbbb'));
