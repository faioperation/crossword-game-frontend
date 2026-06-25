"use client";

import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

type VirtualKeyboardProps = {
  onKeyPress: (key: string) => void;
};

export function VirtualKeyboard({ onKeyPress }: VirtualKeyboardProps) {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-2 mt-6 p-2 bg-slate-100 rounded-xl">
      <div className="flex justify-center gap-1 sm:gap-2">
        {row1.map((key) => (
          <Button
            key={key}
            variant="outline"
            className="w-8 h-10 sm:w-10 sm:h-12 p-0 font-bold bg-white text-slate-800 shadow-sm border-slate-200"
            onClick={() => onKeyPress(key)}
          >
            {key}
          </Button>
        ))}
      </div>
      <div className="flex justify-center gap-1 sm:gap-2 px-4 sm:px-6">
        {row2.map((key) => (
          <Button
            key={key}
            variant="outline"
            className="w-8 h-10 sm:w-10 sm:h-12 p-0 font-bold bg-white text-slate-800 shadow-sm border-slate-200"
            onClick={() => onKeyPress(key)}
          >
            {key}
          </Button>
        ))}
      </div>
      <div className="flex justify-center gap-1 sm:gap-2 pr-0 sm:pr-0">
        <Button
          variant="outline"
          className="w-12 h-10 sm:w-16 sm:h-12 p-0 font-bold bg-slate-200 text-slate-800 shadow-sm border-slate-300"
          onClick={() => onKeyPress("Enter")}
        >
          ENTER
        </Button>
        {row3.map((key) => (
          <Button
            key={key}
            variant="outline"
            className="w-8 h-10 sm:w-10 sm:h-12 p-0 font-bold bg-white text-slate-800 shadow-sm border-slate-200"
            onClick={() => onKeyPress(key)}
          >
            {key}
          </Button>
        ))}
        <Button
          variant="outline"
          className="w-12 h-10 sm:w-16 sm:h-12 p-0 font-bold bg-slate-200 text-slate-800 shadow-sm border-slate-300"
          onClick={() => onKeyPress("Backspace")}
        >
          <Delete className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
