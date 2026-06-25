export type Prize = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
};

export type Winner = {
  id: string;
  name: string;
  prizeName: string;
  winningDate: string; // ISO Date String
};

export type Entry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  type: 'puzzle' | 'alternate';
};

export type PuzzleCell = {
  row: number;
  col: number;
  value: string;
  answer: string;
  isBlack: boolean;
  number?: number;
};

export type Clue = {
  number: number;
  direction: 'across' | 'down';
  text: string;
  answer: string;
  row: number;
  col: number;
};

export type Puzzle = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  grid: PuzzleCell[][];
  clues: Clue[];
};
