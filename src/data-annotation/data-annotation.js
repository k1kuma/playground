const fs = require('fs');

const fileName = "coding_qual_input.txt";

// Helper function to obtain all the keys that are the ends of a pyramid
// until we reach n.
// eg: 1, 3, 6, 10, 15 ...
function pyramidEndsSequence(n) {
    let numRows = 0;
    let pyraElement = 0;
    const sequence = [];

    while (pyraElement < n) {
        numRows++;
        pyraElement += numRows;
        sequence.push(pyraElement);
    }
    return sequence;
}

function decode(fileName) {
    // Create a read stream for the file
    const stream = fs.readFileSync(fileName, 'utf-8');
    const lines = stream.split('\n');

    // Temove last line from lines if it's null/undefined/empty.
    // This will give us the number of elements in the txt file.
    const lastLine = lines[lines.length - 1];
    if (!!lastLine || lastLine == '') {
        lines.pop();
    }

    if (!lines) return null;
    if (lines.length == 0) return '';

    const sequence = pyramidEndsSequence(lines.length);
    const pyramid = {};

    // populate pyramid with number keys that represent the rightmost points of 
    // the pyramid.
    for (const num of sequence) {
        pyramid[num] = '';
    }

    // Go through every line in the txt file (lines) and determine if the number (numStr -> num)
    // is inside pyramid({}). This means that this line has a number that's associated with the 
    // end of a pyramid layer. 
    for (let i = 0; i < lines.length; i++) {
        const [numStr, str] = lines[i].trim().split(' ');
        const num = parseInt(numStr);

        // Add the word to the message if it's the last number in the pyramid row
        if (pyramid[num] != null) {
            pyramid[numStr] = str;
        }
    }

    console.log(pyramid);
    return Object.values(pyramid).join(' ');
}

console.log(decode(fileName));
