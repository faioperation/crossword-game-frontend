import { Puzzle } from '@/types';

export const mockPuzzle: Puzzle = {
  "id": "mini-5x5-custom",
  "title": "Heritage Stackers Daily Mini Crossword",
  "date": "2026-06-29",
  "clues": [
    { "number": 1, "direction": "across", "text": "Young sheep.", "answer": "LAMB", "row": 0, "col": 0 },
    { "number": 5, "direction": "across", "text": "Concerning.", "answer": "ABOUT", "row": 1, "col": 0 },
    { "number": 7, "direction": "across", "text": "A cinema film.", "answer": "MOVIE", "row": 2, "col": 0 },
    { "number": 8, "direction": "across", "text": "Construct.", "answer": "BUILD", "row": 3, "col": 0 },
    { "number": 9, "direction": "across", "text": "A popular talk format: ___ Talks.", "answer": "TED", "row": 4, "col": 1 },
    
    { "number": 1, "direction": "down", "text": "Young sheep.", "answer": "LAMB", "row": 0, "col": 0 },
    { "number": 2, "direction": "down", "text": "Concerning.", "answer": "ABOUT", "row": 0, "col": 1 },
    { "number": 3, "direction": "down", "text": "A cinema film.", "answer": "MOVIE", "row": 0, "col": 2 },
    { "number": 4, "direction": "down", "text": "Construct.", "answer": "BUILD", "row": 0, "col": 3 },
    { "number": 6, "direction": "down", "text": "A popular talk format: ___ Talks.", "answer": "TED", "row": 1, "col": 4 }
  ],
  "grid": [
    [ { "row": 0, "col": 0, "value": "", "answer": "L", "isBlack": false, "number": 1 },
      { "row": 0, "col": 1, "value": "", "answer": "A", "isBlack": false, "number": 2 },
      { "row": 0, "col": 2, "value": "", "answer": "M", "isBlack": false, "number": 3 },
      { "row": 0, "col": 3, "value": "", "answer": "B", "isBlack": false, "number": 4 },
      { "row": 0, "col": 4, "value": "", "answer": "", "isBlack": true } ],
    [ { "row": 1, "col": 0, "value": "", "answer": "A", "isBlack": false, "number": 5 },
      { "row": 1, "col": 1, "value": "", "answer": "B", "isBlack": false },
      { "row": 1, "col": 2, "value": "", "answer": "O", "isBlack": false },
      { "row": 1, "col": 3, "value": "", "answer": "U", "isBlack": false },
      { "row": 1, "col": 4, "value": "", "answer": "T", "isBlack": false, "number": 6 } ],
    [ { "row": 2, "col": 0, "value": "", "answer": "M", "isBlack": false, "number": 7 },
      { "row": 2, "col": 1, "value": "", "answer": "O", "isBlack": false },
      { "row": 2, "col": 2, "value": "", "answer": "V", "isBlack": false },
      { "row": 2, "col": 3, "value": "", "answer": "I", "isBlack": false },
      { "row": 2, "col": 4, "value": "", "answer": "E", "isBlack": false } ],
    [ { "row": 3, "col": 0, "value": "", "answer": "B", "isBlack": false, "number": 8 },
      { "row": 3, "col": 1, "value": "", "answer": "U", "isBlack": false },
      { "row": 3, "col": 2, "value": "", "answer": "I", "isBlack": false },
      { "row": 3, "col": 3, "value": "", "answer": "L", "isBlack": false },
      { "row": 3, "col": 4, "value": "", "answer": "D", "isBlack": false } ],
    [ { "row": 4, "col": 0, "value": "", "answer": "", "isBlack": true },
      { "row": 4, "col": 1, "value": "", "answer": "T", "isBlack": false, "number": 9 },
      { "row": 4, "col": 2, "value": "", "answer": "E", "isBlack": false },
      { "row": 4, "col": 3, "value": "", "answer": "D", "isBlack": false },
      { "row": 4, "col": 4, "value": "", "answer": "", "isBlack": true } ]
  ]
};
