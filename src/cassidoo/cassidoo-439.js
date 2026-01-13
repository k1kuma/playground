/*
Given an array of objects representing bears in a forest, each with a name and hunger level,
return the names of all bears whose hunger level is above the forest average, sorted alphabetically.
In how few lines can you do this one?
*/

function hungryBears(bears) {
  if (!bears) return [];
  const avgHunger = bears.reduce((sum, bear) => sum + bear.hunger, 0) / bears.length;
  return JSON.stringify(bears.filter(bear => bear.hunger > avgHunger).map(bear => bear.name).sort());
}

const bears = [
  { name: 'Baloo', hunger: 6 },
  { name: 'Yogi', hunger: 9 },
  { name: 'Paddington', hunger: 4 },
  { name: 'Winnie', hunger: 10 },
  { name: 'Chicago', hunger: 20 },
];

console.log(hungryBears(bears));
