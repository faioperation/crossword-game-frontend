"use client";

import { useState, useEffect } from "react";
import { Puzzle, PuzzleCell } from "@/types";
import { CrosswordGrid } from "./CrosswordGrid";
import { CrosswordClues } from "./CrosswordClues";
import { WinModal } from "./WinModal";
import { VirtualKeyboard } from "./VirtualKeyboard";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Rules } from "../public/Rules";

type CrosswordGameProps = {
  puzzle: Puzzle;
};

export function CrosswordGame({ puzzle }: CrosswordGameProps) {
  // State for the user's grid
  const [grid, setGrid] = useState<PuzzleCell[][]>(
    puzzle.grid.map(row => row.map(cell => ({ ...cell, value: "" })))
  );
  
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [isWon, setIsWon] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  
  const [hasStarted, setHasStarted] = useState(false);

  // Timer State
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasStarted && !isWon) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hasStarted, isWon]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Helper to get active word boundaries
  const getWordBounds = () => {
    if (!focusedCell) return null;
    let startRow = focusedCell.row;
    let startCol = focusedCell.col;
    let endRow = focusedCell.row;
    let endCol = focusedCell.col;

    if (direction === 'across') {
      while (startCol > 0 && !grid[startRow][startCol - 1].isBlack) startCol--;
      while (endCol < grid[0].length - 1 && !grid[endRow][endCol + 1].isBlack) endCol++;
    } else {
      while (startRow > 0 && !grid[startRow - 1][startCol].isBlack) startRow--;
      while (endRow < grid.length - 1 && !grid[endRow + 1][endCol].isBlack) endRow++;
    }
    return { startRow, startCol, endRow, endCol };
  };

  const wordBounds = getWordBounds();

  // Progress Calculation
  let filledCount = 0;
  let totalCells = 0;
  
  // Check if puzzle is solved
  useEffect(() => {
    let solved = true;
    let filled = true;
    
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const cell = grid[r][c];
        if (!cell.isBlack) {
          if (cell.value === "") filled = false;
          if (cell.value.toUpperCase() !== cell.answer.toUpperCase()) {
            solved = false;
          }
        }
      }
    }
    
    if (filled && solved) {
      setIsWon(true);
      setShowErrors(false);
    }
  }, [grid]);

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (!grid[r][c].isBlack) {
        totalCells++;
        if (grid[r][c].value !== "") filledCount++;
      }
    }
  }
  const progressPercent = Math.round((filledCount / totalCells) * 100);

  const handleCellChange = (row: number, col: number, value: string) => {
    if (!hasStarted) setHasStarted(true);
    setShowErrors(false); // Hide errors once user starts typing again
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], value: value.toUpperCase() };
    setGrid(newGrid);
  };

  const handleCellFocus = (row: number, col: number) => {
    if (focusedCell?.row === row && focusedCell?.col === col) {
      setDirection(prev => prev === 'across' ? 'down' : 'across');
    } else {
      setFocusedCell({ row, col });
    }
  };

  const handleNavigate = (row: number, col: number, dir: 'next' | 'prev' | 'up' | 'down' | 'left' | 'right' | 'next-clue' | 'prev-clue') => {
    if (dir === 'next-clue' || dir === 'prev-clue') {
      const allClues = puzzle.clues;
      // Get current active clue
      const currentClues = allClues.filter(c => c.direction === direction).sort((a,b) => a.number - b.number);
      let currentIndex = -1;
      if (wordBounds) {
        currentIndex = currentClues.findIndex(c => c.row === wordBounds.startRow && c.col === wordBounds.startCol);
      }
      
      let nextClue = null;
      if (dir === 'next-clue') {
        if (currentIndex < currentClues.length - 1) {
          nextClue = currentClues[currentIndex + 1];
        } else {
          // Wrap around or switch direction
          const otherDirection = direction === 'across' ? 'down' : 'across';
          const otherClues = allClues.filter(c => c.direction === otherDirection).sort((a,b) => a.number - b.number);
          if (otherClues.length > 0) {
            nextClue = otherClues[0];
            setDirection(otherDirection);
          }
        }
      } else {
        if (currentIndex > 0) {
          nextClue = currentClues[currentIndex - 1];
        } else {
          // Switch direction
          const otherDirection = direction === 'across' ? 'down' : 'across';
          const otherClues = allClues.filter(c => c.direction === otherDirection).sort((a,b) => a.number - b.number);
          if (otherClues.length > 0) {
            nextClue = otherClues[otherClues.length - 1];
            setDirection(otherDirection);
          }
        }
      }
      
      if (nextClue) {
        setFocusedCell({ row: nextClue.row, col: nextClue.col });
      }
      return;
    }

    let newRow = row;
    let newCol = col;
    
    if (dir === 'next') {
      if (direction === 'across') newCol += 1;
      else newRow += 1;
    } else if (dir === 'prev') {
      if (direction === 'across') newCol -= 1;
      else newRow -= 1;
    } else if (dir === 'up') newRow -= 1;
    else if (dir === 'down') newRow += 1;
    else if (dir === 'left') newCol -= 1;
    else if (dir === 'right') newCol += 1;

    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      if (!grid[newRow][newCol].isBlack) {
        setFocusedCell({ row: newRow, col: newCol });
      }
    }
  };

  const handleVirtualKeyPress = (key: string) => {
    if (!focusedCell) return;
    if (!hasStarted) setHasStarted(true);
    
    if (key === "Backspace") {
      const currentVal = grid[focusedCell.row][focusedCell.col].value;
      if (currentVal === "") {
        handleNavigate(focusedCell.row, focusedCell.col, 'prev');
      } else {
        handleCellChange(focusedCell.row, focusedCell.col, "");
      }
    } else if (key === "Enter") {
      setDirection(prev => prev === 'across' ? 'down' : 'across');
    } else if (key.length === 1 && /[a-zA-Z]/.test(key)) {
      handleCellChange(focusedCell.row, focusedCell.col, key);
      handleNavigate(focusedCell.row, focusedCell.col, 'next');
    }
  };

  const handleCheck = () => {
    setShowErrors(true);
  };

  const handleClueClick = (clue: any) => {
    setDirection(clue.direction);
    setFocusedCell({ row: clue.row, col: clue.col });
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* 3-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full items-start">
        
        {/* Left Column: Across Clues */}
        <div className="w-full lg:w-1/4 order-2 lg:order-1">
          <CrosswordClues 
            clues={puzzle.clues} 
            focusedCell={focusedCell}
            direction={direction}
            filterDirection="across"
            onClueClick={handleClueClick}
            wordBounds={wordBounds}
          />
        </div>
        
        {/* Center Column: Grid & Controls */}
        <div className="w-full lg:w-2/4 order-1 lg:order-2 flex flex-col">
          
          {/* Top Bar */}
          <div className="flex flex-wrap justify-between items-center mb-4 bg-white p-3 rounded-xl border shadow-sm gap-2">
            
            {/* Rules Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full font-semibold border-primary/20 text-primary hover:bg-primary/5">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Rules</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>How to Play</DialogTitle>
                </DialogHeader>
                <Rules />
              </DialogContent>
            </Dialog>

            {/* Check Button */}
            <Button 
              onClick={handleCheck}
              variant="default" 
              size="sm" 
              className="gap-2 rounded-full font-bold shadow-md bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
            >
              <CheckCircle2 className="w-4 h-4" />
              Check
            </Button>

            {/* Progress UI */}
            <div className="hidden sm:flex flex-col text-xs font-medium text-slate-500 text-center">
              <span>{filledCount} / {totalCells}</span>
              <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-0.5">
                <div className="h-full bg-green-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 font-mono text-lg font-bold text-slate-800 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
              <Clock className="w-4 h-4 text-slate-500" />
              {formatTime(seconds)}
            </div>
          </div>

          {/* Grid */}
          <div className="w-full">
            <CrosswordGrid 
              grid={grid} 
              focusedCell={focusedCell}
              direction={direction}
              showErrors={showErrors}
              isWon={isWon}
              wordBounds={wordBounds}
              onChange={handleCellChange}
              onFocus={handleCellFocus}
              onNavigate={handleNavigate}
            />
          </div>

          {/* Virtual Keyboard */}
          <div className="w-full mt-4">
            <VirtualKeyboard onKeyPress={handleVirtualKeyPress} />
          </div>
        </div>
        
        {/* Right Column: Down Clues */}
        <div className="w-full lg:w-1/4 order-3 lg:order-3">
          <CrosswordClues 
            clues={puzzle.clues} 
            focusedCell={focusedCell}
            direction={direction}
            filterDirection="down"
            onClueClick={handleClueClick}
            wordBounds={wordBounds}
          />
        </div>

      </div>

      <WinModal isOpen={isWon} onClose={() => setIsWon(false)} time={formatTime(seconds)} />
    </div>
  );
}
