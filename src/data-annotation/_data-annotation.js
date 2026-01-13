const axios = require('axios');
const cheerio = require('cheerio');

async function getPublicGoogleDocContent(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

function parseTableContent(html) {
  const gridData = [];
  const $ = cheerio.load(html);

  $('table tr').each((i, row) => {
    if (i === 0) return;

    const columns = $(row).find('td');
    if (columns.length === 3) {
      const x = parseInt($(columns[0]).text().trim(), 10);
      const char = $(columns[1]).text().trim();
      const y = parseInt($(columns[2]).text().trim(), 10);

      gridData.push({ char, x, y });
    }
  });

  return gridData;
}

function buildGrid(gridData) {
  const maxX = Math.max(...gridData.map((data) => data.x));
  const maxY = Math.max(...gridData.map((data) => data.y));

  const grid = Array.from({ length: maxY + 1 }, () =>
    Array.from({ length: maxX + 1 }, () => ' ')
  );

  for (const { char, x, y } of gridData) {
    grid[maxY - y][x] = char;
  }

  return grid;
}

function printGrid(grid) {
  for (const row of grid) console.log(row.join(''));
}

async function main(url) {
  try {
    const htmlContent = await getPublicGoogleDocContent(url);
    const gridData = parseTableContent(htmlContent);
    const grid = buildGrid(gridData);
    printGrid(grid);
  } catch (error) {
    console.error('Error:', error);
  }
}

// const publicDocUrl = 'https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub';
const publicDocUrl = 'https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub';
main(publicDocUrl);