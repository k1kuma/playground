/*
Given a string that contains only digits from 0 to 9 and a number n,
replace each consecutive run of n with its length.
*/

function replaceRepeats(str, n) {
  if (str == null || str == undefined || n == null || n == undefined) return '';

  let result = '';
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      if (str[i - 1] == n) {
        result += count;
      } else {
        result += str[i - 1].repeat(count);
      }
      count = 1;
    }
  }

  return result;
}


/*
Examples:

> replaceRepeats('1234500362000440', 0)
> 1234523623441

> replaceRepeats('000000000000', 0)
> 12

> replaceRepeats('123456789', 1)
> 123456789
*/

console.log(replaceRepeats('1234500362000440', 0) === '1234523623441');
console.log(replaceRepeats('000000000000', 0) === '12');
console.log(replaceRepeats('123456789', 1) === '123456789');
