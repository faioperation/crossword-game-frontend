import { useState, useCallback, useEffect } from "react";

export type Cell = {
  row: number;
  col: number;
  isBlack: boolean;
  letter: string;
  clueNum: number | null;
};

export type ClueDirection = "Across" | "Down";

export type Clue = {
  id: string; // e.g., "1-Across"
  number: number;
  direction: ClueDirection;
  answer: string;
  text: string;
};

export function useCrosswordBuilder(initialSize: number = 5) {
  const [size, setSize] = useState(initialSize);
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [clues, setClues] = useState<Clue[]>([]);

  // Initialize empty grid
  useEffect(() => {
    const newGrid: Cell[][] = [];
    for (let r = 0; r < size; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < size; c++) {
        row.push({ row: r, col: c, isBlack: false, letter: "", clueNum: null });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, [size]);

  // Main processing engine
  const processGrid = useCallback((currentGrid: Cell[][], currentClues: Clue[]) => {
    if (!currentGrid || currentGrid.length === 0) return currentGrid;

    const newGrid = currentGrid.map((row) =>
      row.map((cell): Cell => ({ ...cell, clueNum: null }))
    );

    let currentNumber = 1;
    const newClues: Clue[] = [];

    // Helper to check if a cell is black or out of bounds
    const isBlock = (r: number, c: number) => {
      if (r < 0 || r >= size || c < 0 || c >= size) return true;
      return newGrid[r][c].isBlack;
    };

    // 1. Assign Numbers and find starts
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newGrid[r][c].isBlack) continue;

        const isAcrossStart = isBlock(r, c - 1) && !isBlock(r, c + 1);
        const isDownStart = isBlock(r - 1, c) && !isBlock(r + 1, c);

        if (isAcrossStart || isDownStart) {
          newGrid[r][c].clueNum = currentNumber;

          if (isAcrossStart) {
            // Trace Across word
            let answer = "";
            let currC = c;
            while (currC < size && !newGrid[r][currC].isBlack) {
              answer += newGrid[r][currC].letter || " ";
              currC++;
            }
            const id = `${currentNumber}-Across`;
            const existingClue = currentClues.find((cl) => cl.id === id);
            newClues.push({
              id,
              number: currentNumber,
              direction: "Across",
              answer: answer.trim() ? answer : "",
              text: existingClue ? existingClue.text : "",
            });
          }

          if (isDownStart) {
            // Trace Down word
            let answer = "";
            let currR = r;
            while (currR < size && !newGrid[currR][c].isBlack) {
              answer += newGrid[currR][c].letter || " ";
              currR++;
            }
            const id = `${currentNumber}-Down`;
            const existingClue = currentClues.find((cl) => cl.id === id);
            newClues.push({
              id,
              number: currentNumber,
              direction: "Down",
              answer: answer.trim() ? answer : "",
              text: existingClue ? existingClue.text : "",
            });
          }

          currentNumber++;
        }
      }
    }

    setClues(newClues);
    return newGrid;
  }, [size]);

  // Actions
  const toggleBlackCell = (row: number, col: number) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      newGrid[row][col] = { ...newGrid[row][col], isBlack: !newGrid[row][col].isBlack };
      if (newGrid[row][col].isBlack) {
        newGrid[row][col].letter = ""; // Clear letter if making it black
      }
      return processGrid(newGrid, clues);
    });
  };

  const setCellLetter = (row: number, col: number, letter: string) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      if (!newGrid[row][col].isBlack) {
        newGrid[row][col] = { ...newGrid[row][col], letter: letter.toUpperCase() };
      }
      return processGrid(newGrid, clues);
    });
  };

  const updateClueText = (id: string, text: string) => {
    setClues((prev) =>
      prev.map((c) => (c.id === id ? { ...c, text } : c))
    );
  };

  // Helper for keyboard navigation
  const getNextCell = (r: number, c: number, direction: "Across" | "Down"): { r: number, c: number } | null => {
    if (direction === "Across") {
      let nextC = c + 1;
      while (nextC < size) {
        if (!grid[r][nextC].isBlack) return { r, c: nextC };
        nextC++;
      }
    } else {
      let nextR = r + 1;
      while (nextR < size) {
        if (!grid[nextR][c].isBlack) return { r: nextR, c };
        nextR++;
      }
    }
    return null;
  };

  return {
    size,
    setSize,
    grid,
    clues,
    toggleBlackCell,
    setCellLetter,
    updateClueText,
    getNextCell,
    processGrid
  };
}
