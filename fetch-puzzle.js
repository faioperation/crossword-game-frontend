const fs = require('fs');
const https = require('https');

https.get('https://raw.githubusercontent.com/doshea/nyt_crosswords/master/1976/01/01.json', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const puzzle = JSON.parse(data);
    const rows = puzzle.size.rows;
    const cols = puzzle.size.cols;
    
    let ourGrid = [];
    let ourClues = [];
    
    // Parse across clues
    for (let i = 0; i < puzzle.clues.across.length; i++) {
      let clueRaw = puzzle.clues.across[i];
      let num = parseInt(clueRaw.split('.')[0]);
      let text = clueRaw.substring(clueRaw.indexOf('.') + 2);
      let answer = puzzle.answers.across[i];
      
      // find row/col of this number
      let idx = puzzle.gridnums.indexOf(num);
      let r = Math.floor(idx / cols);
      let c = idx % cols;
      
      ourClues.push({
        number: num,
        direction: 'across',
        text: text,
        answer: answer,
        row: r,
        col: c
      });
    }
    
    // Parse down clues
    for (let i = 0; i < puzzle.clues.down.length; i++) {
      let clueRaw = puzzle.clues.down[i];
      let num = parseInt(clueRaw.split('.')[0]);
      let text = clueRaw.substring(clueRaw.indexOf('.') + 2);
      let answer = puzzle.answers.down[i];
      
      // find row/col of this number
      let idx = puzzle.gridnums.indexOf(num);
      let r = Math.floor(idx / cols);
      let c = idx % cols;
      
      ourClues.push({
        number: num,
        direction: 'down',
        text: text,
        answer: answer,
        row: r,
        col: c
      });
    }
    
    // Build grid
    for (let r = 0; r < rows; r++) {
      let rowArray = [];
      for (let c = 0; c < cols; c++) {
        let idx = r * cols + c;
        let isBlack = puzzle.grid[idx] === '.';
        let number = puzzle.gridnums[idx] > 0 ? puzzle.gridnums[idx] : undefined;
        let answer = isBlack ? "" : puzzle.grid[idx];
        
        let cell = {
          row: r,
          col: c,
          value: "",
          answer: answer,
          isBlack: isBlack
        };
        if (number) cell.number = number;
        
        rowArray.push(cell);
      }
      ourGrid.push(rowArray);
    }
    
    const output = `import { Puzzle } from "@/types";

export const mockPuzzle: Puzzle = {
  id: "nyt-2018-01-01",
  title: "NYT Crossword - Jan 1, 2018",
  date: "2018-01-01",
  clues: ${JSON.stringify(ourClues, null, 2)},
  grid: ${JSON.stringify(ourGrid, null, 2)}
};
`;

    fs.writeFileSync('./lib/puzzle-data.ts', output);
    console.log("Successfully generated complex 15x15 NYT puzzle in puzzle-data.ts");
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
