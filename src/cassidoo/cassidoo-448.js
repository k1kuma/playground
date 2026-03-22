/*
You're given a 2D grid representing a city where each cell is either
empty (0), a fire station (1), or a building (2). Fire stations can serve
buildings based on horizontal + vertical moves only.
Return a 2D grid where each cell shows the minimum distance to the nearest fire station.
*/

function fireStationCoverage(grid) {
  if (!grid || grid.length === 0) return [];
  const rows = grid.length;
  const cols = grid[0].length;
  const result = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const queue = [];
  const visited = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        result[r][c] = 0;
        queue.push([r, c, 0]);
        visited.add(`${r},${c}`);
      }
    }
  }

  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let queueIndex = 0;
  
  while (queueIndex < queue.length) {
    const [r, c, dist] = queue[queueIndex++];

    for (const [dr, dc] of directions) {
      const newRow = r + dr;
      const newCol = c + dc;
      const key = `${newRow},${newCol}`;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited.has(key)) {
        const newDist = dist + 1;
        if (grid[newRow][newCol] === 2 || grid[newRow][newCol] === 0) {
          result[newRow][newCol] = newDist;
          queue.push([newRow, newCol, newDist]);
          visited.add(key);
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (result[r][c] === Infinity) {
        result[r][c] = -1;
      }
    }
  }

  return result;
}

/*
Examples:

> fireStationCoverage([
  [2, 0, 1],
  [0, 2, 0],
  [1, 0, 2]
])
> [[2, 1, 0],
   [1, 2, 1],
   [0, 1, 2]]

> fireStationCoverage([
  [1, 0, 0, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 1]
])
> [[0, 1, 2, 0],
   [1, 2, 2, 1],
   [1, 2, 2, 1],
   [0, 1, 2, 0]]
*/

function printMatrix(matrix, label = "") {
  if (label) console.log(label);
  matrix.forEach(row => {
    console.log('[' + row.map(val => String(val).padStart(2, ' ')).join(', ') + ']');
  });
  console.log();
}

console.log("Test Case 1:\n");
printMatrix(fireStationCoverage([
  [2, 0, 1],
  [0, 2, 0],
  [1, 0, 2]
]));

console.log("Test Case 2:\n");
printMatrix(fireStationCoverage([
  [1, 0, 0, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 1]
]));
