import { Puzzle } from "@/types";

export const mockPuzzle: Puzzle = {
  id: "puzzle-2026-06-25-real",
  title: "Daily Mini Crossword",
  date: "2026-06-25",
  clues: [
    { number: 1, direction: "across", text: "Consumed food", answer: "ATE", row: 0, col: 1 },
    { number: 4, direction: "across", text: "Not dead", answer: "ALIVE", row: 1, col: 0 },
    { number: 6, direction: "across", text: "Periods of history", answer: "TIMES", row: 2, col: 0 },
    { number: 7, direction: "across", text: "A special occasion", answer: "EVENT", row: 3, col: 0 },
    { number: 8, direction: "across", text: "Established (abbr.)", answer: "EST", row: 4, col: 1 },
    
    { number: 1, direction: "down", text: "Not dead", answer: "ALIVE", row: 0, col: 1 },
    { number: 2, direction: "down", text: "Periods of history", answer: "TIMES", row: 0, col: 2 },
    { number: 3, direction: "down", text: "A special occasion", answer: "EVENT", row: 0, col: 3 },
    { number: 4, direction: "down", text: "Consumed food", answer: "ATE", row: 1, col: 0 },
    { number: 5, direction: "down", text: "Established (abbr.)", answer: "EST", row: 1, col: 4 },
  ],
  grid: [
    [
      { row: 0, col: 0, value: "", answer: "", isBlack: true },
      { row: 0, col: 1, value: "", answer: "A", isBlack: false, number: 1 },
      { row: 0, col: 2, value: "", answer: "T", isBlack: false, number: 2 },
      { row: 0, col: 3, value: "", answer: "E", isBlack: false, number: 3 },
      { row: 0, col: 4, value: "", answer: "", isBlack: true }
    ],
    [
      { row: 1, col: 0, value: "", answer: "A", isBlack: false, number: 4 },
      { row: 1, col: 1, value: "", answer: "L", isBlack: false },
      { row: 1, col: 2, value: "", answer: "I", isBlack: false },
      { row: 1, col: 3, value: "", answer: "V", isBlack: false },
      { row: 1, col: 4, value: "", answer: "E", isBlack: false, number: 5 }
    ],
    [
      { row: 2, col: 0, value: "", answer: "T", isBlack: false, number: 6 },
      { row: 2, col: 1, value: "", answer: "I", isBlack: false },
      { row: 2, col: 2, value: "", answer: "M", isBlack: false },
      { row: 2, col: 3, value: "", answer: "E", isBlack: false },
      { row: 2, col: 4, value: "", answer: "S", isBlack: false }
    ],
    [
      { row: 3, col: 0, value: "", answer: "E", isBlack: false, number: 7 },
      { row: 3, col: 1, value: "", answer: "V", isBlack: false },
      { row: 3, col: 2, value: "", answer: "E", isBlack: false },
      { row: 3, col: 3, value: "", answer: "N", isBlack: false },
      { row: 3, col: 4, value: "", answer: "T", isBlack: false }
    ],
    [
      { row: 4, col: 0, value: "", answer: "", isBlack: true },
      { row: 4, col: 1, value: "", answer: "E", isBlack: false, number: 8 },
      { row: 4, col: 2, value: "", answer: "S", isBlack: false },
      { row: 4, col: 3, value: "", answer: "T", isBlack: false },
      { row: 4, col: 4, value: "", answer: "", isBlack: true }
    ]
  ]
};
