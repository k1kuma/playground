/*
  Cassidoo Challenge #444: Zoom Matrix
  Row: row.length * k;
  Col: r * k
*/
function zoom(m, k) {
  const res = [];
  for (const row of m) {
    const newRow = [];
    for (const col of row) {
      for (let i = 0; i < k; i++) {
        newRow.push(col);
      }
    }
    for (let i = 0; i < k; i++) {
      res.push([...newRow]);
    }
  }

  return res;
}

/*
zoom([[1,2],[3,4]], 2)
[
  [1,1,2,2],
  [1,1,2,2],
  [3,3,4,4],
  [3,3,4,4]
]

zoom([[7,8,9]], 3)
[
  [7,7,7,8,8,8,9,9,9],
  [7,7,7,8,8,8,9,9,9],
  [7,7,7,8,8,8,9,9,9]
]

zoom([[1],[2]], 3)
[
  [1,1,1],
  [1,1,1],
  [1,1,1],
  [2,2,2],
  [2,2,2],
  [2,2,2]
]
*/

zoom([[1,2],[3,4]], 2).forEach(row => console.log(JSON.stringify(row)));
console.log('\n');
zoom([[7,8,9]], 3).forEach(row => console.log(JSON.stringify(row)));
console.log('\n');
zoom([[1],[2]], 3).forEach(row => console.log(JSON.stringify(row)));
