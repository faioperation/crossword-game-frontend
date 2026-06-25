"use client";

import { Clue } from "@/types";
import { cn } from "@/lib/utils";

type CrosswordCluesProps = {
  clues: Clue[];
  focusedCell: { row: number; col: number } | null;
  direction: 'across' | 'down';
  filterDirection: 'across' | 'down';
  wordBounds?: { startRow: number; startCol: number; endRow: number; endCol: number } | null;
  onClueClick: (clue: Clue) => void;
};

export function CrosswordClues({ clues, focusedCell, direction, filterDirection, onClueClick, wordBounds }: CrosswordCluesProps) {
  const filteredClues = clues.filter(c => c.direction === filterDirection).sort((a, b) => a.number - b.number);

  // Determine which clue is active based on exact word boundaries
  const isActiveClue = (clue: Clue) => {
    if (!wordBounds) return false;
    if (clue.direction !== direction) return false;
    
    // Exact match the start of the word with the clue coordinate
    return clue.row === wordBounds.startRow && clue.col === wordBounds.startCol;
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full lg:max-h-[700px] overflow-y-auto pr-2">
      <div className="bg-slate-900 rounded-t-xl rounded-b-md shadow-lg border border-slate-800 overflow-hidden">
        <div className="bg-black text-white px-4 py-2 font-bold tracking-wider text-sm uppercase">
          {filterDirection}
        </div>
        <ul className="bg-white p-4 space-y-1">
          {filteredClues.map(clue => (
            <li 
              key={`${filterDirection}-${clue.number}`} 
              onClick={() => onClueClick(clue)}
              className={cn(
                "flex gap-3 text-sm p-2 rounded-md transition-colors cursor-pointer",
                isActiveClue(clue) ? "bg-[#a2d2d5] text-slate-900 font-bold" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <span className="font-bold min-w-[20px] text-right">{clue.number}</span>
              <span className="flex-1">{clue.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
