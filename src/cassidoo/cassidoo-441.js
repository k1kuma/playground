/*
You are given a string consisting of lowercase words, each separated by a single space.
Determine how many vowels appear in the first word. Then, reverse each following word that has the same vowel count.

Examples:

flippedy("cat and mice")
> "cat dna mice"

flippedy("banana healthy")
> "banana healthy"
*/

function flippedy(s) {
  const words = s.split(" ");
  const countVowels = (word) => {
    return [...word].filter((char) => "aeiou".includes(char)).length;
  };
  const targetVowelCount = countVowels(words[0]);
  const result = [words[0]];
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const vowelCount = countVowels(word);
    if (vowelCount === targetVowelCount) result.push(word.split("").reverse().join(""));
    else result.push(word);
  }

  return result.join(" ");
}

console.log(flippedy('cat and mice')); //"cat dna mice"
console.log(flippedy('banana healthy')); // "banana healthy"
