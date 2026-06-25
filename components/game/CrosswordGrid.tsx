"use client";

import { PuzzleCell } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type CrosswordGridProps = {
  grid: PuzzleCell[][];
  focusedCell: { row: number; col: number } | null;
  direction: 'across' | 'down';
  showErrors: boolean;
  isWon?: boolean;
  wordBounds?: { startRow: number; startCol: number; endRow: number; endCol: number } | null;
  onChange: (row: number, col: number, value: string) => void;
  onFocus: (row: number, col: number) => void;
  onNavigate: (row: number, col: number, dir: 'next' | 'prev' | 'up' | 'down' | 'left' | 'right' | 'next-clue' | 'prev-clue') => void;
};

export function CrosswordGrid({ grid, focusedCell, direction, showErrors, isWon, wordBounds, onChange, onFocus, onNavigate }: CrosswordGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if a cell is highlighted based on exact word boundaries
  const isCellInActiveWord = (r: number, c: number) => {
    if (!wordBounds) return false;
    if (grid[r][c].isBlack) return false;
    
    if (direction === 'across') {
      return r === wordBounds.startRow && c >= wordBounds.startCol && c <= wordBounds.endCol;
    } else {
      return c === wordBounds.startCol && r >= wordBounds.startRow && r <= wordBounds.endRow;
    }
  };

  useEffect(() => {
    if (focusedCell && !isWon) {
      const input = document.getElementById(`cell-${focusedCell.row}-${focusedCell.col}`);
      input?.focus();
    }
  }, [focusedCell, isWon]);

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-square border-4 border-slate-900 bg-slate-900 grid gap-[2px] shadow-xl rounded-sm overflow-hidden"
      style={{ gridTemplateRows: `repeat(${grid.length}, minmax(0, 1fr))` }}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
          {row.map((cell, colIndex) => {
            const isFocused = focusedCell?.row === rowIndex && focusedCell?.col === colIndex;
            const isHighlighted = isCellInActiveWord(rowIndex, colIndex);
            const hasValue = cell.value !== "";
            const isWrong = showErrors && hasValue && cell.value.toUpperCase() !== cell.answer.toUpperCase();
            const isCorrect = showErrors && hasValue && cell.value.toUpperCase() === cell.answer.toUpperCase();
            
            return (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "relative aspect-square w-full h-full flex items-center justify-center transition-colors duration-200",
                  cell.isBlack ? "bg-slate-900" : "bg-white",
                  isHighlighted && !isFocused && !cell.isBlack && !showErrors && "bg-[#a2d2d5]",
                  isFocused && !cell.isBlack && !showErrors && "bg-[#4ca4ab]",
                  isWrong && "bg-red-100",
                  isCorrect && "bg-green-50"
                )}
                onClick={() => !cell.isBlack && !isWon && onFocus(rowIndex, colIndex)}
              >
                {!cell.isBlack && (
                  <>
                    {cell.number && (
                      <span className="absolute top-1 left-1 text-[10px] sm:text-xs font-bold leading-none text-slate-800 pointer-events-none select-none">
                        {cell.number}
                      </span>
                    )}
                    <input
                      id={`cell-${rowIndex}-${colIndex}`}
                      type="text"
                      maxLength={1}
                      disabled={isWon}
                      value={cell.value}
                      className={cn(
                        "w-full h-full text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase bg-transparent outline-none cursor-pointer caret-transparent",
                        isWrong ? "text-red-600" : isCorrect ? "text-green-600" : "text-slate-900"
                      )}
                      onChange={(e) => {
                        const val = e.target.value.slice(-1); 
                        onChange(rowIndex, colIndex, val);
                        if (val !== "") {
                          onNavigate(rowIndex, colIndex, 'next');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          if (cell.value === "") {
                            onNavigate(rowIndex, colIndex, 'prev');
                          } else {
                            onChange(rowIndex, colIndex, "");
                          }
                        } else if (e.key === "Delete") {
                          onChange(rowIndex, colIndex, "");
                        } else if (e.key === " ") {
                          e.preventDefault();
                          onFocus(rowIndex, colIndex); // This toggles direction
                        } else if (e.key === "Tab") {
                          e.preventDefault();
                          onNavigate(rowIndex, colIndex, e.shiftKey ? 'prev-clue' : 'next-clue');
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          onNavigate(rowIndex, colIndex, 'up');
                        } else if (e.key === "ArrowDown") {
                          e.preventDefault();
                          onNavigate(rowIndex, colIndex, 'down');
                        } else if (e.key === "ArrowLeft") {
                          e.preventDefault();
                          onNavigate(rowIndex, colIndex, 'left');
                        } else if (e.key === "ArrowRight") {
                          e.preventDefault();
                          onNavigate(rowIndex, colIndex, 'right');
                        } else if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
                          e.preventDefault();
                          onChange(rowIndex, colIndex, e.key);
                          onNavigate(rowIndex, colIndex, 'next');
                        }
                      }}
                      onFocus={() => !isWon && onFocus(rowIndex, colIndex)}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
