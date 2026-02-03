// February 2026 is a perfect month! Write a function that returns the
// closest previous and next perfect month around the given Gregorian year.

function nearestPerfectMonths(year) {
  const isPerfectFebruary = (y) => {
    const feb1 = new Date(y, 1, 1); // February 1st
    const feb1Day = feb1.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);

    if (isLeap) return false;

    const feb28 = new Date(y, 1, 28);
    const feb28Day = feb28.getDay();

    return feb1Day === 0 || feb28Day === 0;
  };

  let prevYear = year;
  while (prevYear > 0 && !isPerfectFebruary(prevYear)) {
    prevYear--;
  }

  let nextYear = year + 1;
  while (!isPerfectFebruary(nextYear)) {
    nextYear++;
  }

  return { prev: `${prevYear}-02`, next: `${nextYear}-02` };
}

/*
Examples:

nearestPerfectMonths(2025)
> { prev: "2021-02", next: "2026-02" }

nearestPerfectMonths(2026)
> { prev: "2026-02", next: "2027-02" }
*/

console.log(nearestPerfectMonths(2025)); // { prev: "2021-02", next: "2026-02" }
console.log(nearestPerfectMonths(2026)); // { prev: "2026-02", next: "2027-02" }
