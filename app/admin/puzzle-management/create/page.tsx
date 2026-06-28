"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Eye, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { useCrosswordBuilder } from "@/hooks/useCrosswordBuilder";

export default function CreatePuzzlePage() {
  const router = useRouter();
  const { size, setSize, grid, clues, toggleBlackCell, setCellLetter, updateClueText } = useCrosswordBuilder(5);
  
  // Section 1 State
  const [title, setTitle] = useState("Daily Mini Crossword");
  const [date, setDate] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [status, setStatus] = useState("Draft");
  const [prize, setPrize] = useState("");

  // Validation State
  const [errors, setErrors] = useState<string[]>([]);

  // Split clues
  const acrossClues = clues.filter(c => c.direction === "Across");
  const downClues = clues.filter(c => c.direction === "Down");

  const runValidation = () => {
    const newErrors: string[] = [];
    
    // Check 1: Every detected word has a clue
    clues.forEach(clue => {
      if (!clue.text.trim()) {
        newErrors.push(`Missing clue text for ${clue.id} (${clue.answer})`);
      }
    });

    // Check 2: Every answer has at least 2 letters
    clues.forEach(clue => {
      if (clue.answer.trim().length < 2) {
        newErrors.push(`${clue.id} is too short. Minimum 2 letters required.`);
      }
      if (clue.answer.includes(" ")) {
        newErrors.push(`${clue.id} contains empty cells.`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handlePublish = () => {
    if (runValidation()) {
      toast.success("Puzzle published successfully!");
      router.push("/admin/puzzle-management");
    } else {
      toast.error("Validation failed. Please fix the errors below.");
    }
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!");
    router.push("/admin/puzzle-management");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, r: number, c: number) => {
    if (e.key === "Backspace" && !grid[r][c].letter) {
      // Logic to move back could go here
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white border border-slate-200">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Puzzle</h2>
          <p className="text-slate-500 font-medium text-base mt-1">Design and publish a new mini crossword.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Main Editor) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Section 1: Information */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800">1. Puzzle Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Puzzle Title</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Publish Date</label>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="h-10 px-3 rounded-md border border-slate-200 bg-slate-50 text-sm">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="h-10 px-3 rounded-md border border-slate-200 bg-slate-50 text-sm">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Daily Prize</label>
                <Input value={prize} onChange={e => setPrize(e.target.value)} placeholder="e.g. Silver Eagle" className="bg-slate-50 border-slate-200" />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Grid Builder */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800">2. Grid Builder</CardTitle>
              <CardDescription>
                Right-click or Double-click a cell to toggle it black/white. Type letters to automatically detect words.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center">
              <div className="mb-4 self-start flex items-center gap-4">
                <label className="text-sm font-semibold text-slate-700">Grid Size:</label>
                <select value={size} onChange={e => setSize(Number(e.target.value))} className="h-9 px-3 rounded-md border border-slate-200 bg-slate-50 text-sm">
                  <option value={4}>4 x 4</option>
                  <option value={5}>5 x 5</option>
                  <option value={6}>6 x 6</option>
                  <option value={7}>7 x 7</option>
                </select>
              </div>

              <div className="w-full max-w-[500px] aspect-square mx-auto">
                <div 
                  className="grid bg-slate-900 border-2 border-slate-900 w-full h-full"
                  style={{ 
                    gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                    gap: '2px'
                  }}
                >
                {grid.map((row, r) => (
                  row.map((cell, c) => (
                    <div 
                      key={`${r}-${c}`} 
                      className={`relative flex items-center justify-center w-full h-full ${cell.isBlack ? 'bg-slate-900' : 'bg-white'}`}
                      onDoubleClick={() => toggleBlackCell(r, c)}
                      onContextMenu={(e) => { e.preventDefault(); toggleBlackCell(r, c); }}
                    >
                      {!cell.isBlack && cell.clueNum && (
                        <span className="absolute top-1 left-1.5 sm:top-1.5 sm:left-2 text-[10px] sm:text-sm font-bold text-slate-600 pointer-events-none select-none z-10 leading-none">
                          {cell.clueNum}
                        </span>
                      )}
                      {!cell.isBlack && (
                        <input
                          type="text"
                          maxLength={1}
                          className="w-full h-full text-center text-2xl sm:text-4xl font-bold uppercase focus:outline-none focus:bg-blue-50 caret-transparent cursor-pointer"
                          value={cell.letter}
                          onChange={(e) => setCellLetter(r, c, e.target.value.toUpperCase())}
                          onKeyDown={(e) => handleKeyDown(e, r, c)}
                          onDoubleClick={(e) => { e.stopPropagation(); toggleBlackCell(r, c); }}
                          onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); toggleBlackCell(r, c); }}
                        />
                      )}
                    </div>
                  ))
                ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-6 text-center">
                Words and numbers are automatically generated based on the letters and black cells placed here.
              </p>
            </CardContent>
          </Card>

          {/* Section 3 & 4: Clues Editor */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800">3 & 4. Clues Editor</CardTitle>
              <CardDescription>
                Write clues for the automatically detected words. Answers are generated from the grid.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid sm:grid-cols-2 gap-8">
              
              {/* Across */}
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-slate-800 border-b border-slate-200 pb-2">Across</h3>
                {acrossClues.length === 0 && <p className="text-sm text-slate-500">No across words detected.</p>}
                {acrossClues.map(clue => (
                  <div key={clue.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">{clue.number}</span>
                      <span className="text-sm font-mono font-semibold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">{clue.answer || "[Empty]"}</span>
                    </div>
                    <Textarea 
                      placeholder="Enter clue text..." 
                      className="resize-none h-20 text-sm"
                      value={clue.text}
                      onChange={(e) => updateClueText(clue.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {/* Down */}
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-slate-800 border-b border-slate-200 pb-2">Down</h3>
                {downClues.length === 0 && <p className="text-sm text-slate-500">No down words detected.</p>}
                {downClues.map(clue => (
                  <div key={clue.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">{clue.number}</span>
                      <span className="text-sm font-mono font-semibold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">{clue.answer || "[Empty]"}</span>
                    </div>
                    <Textarea 
                      placeholder="Enter clue text..." 
                      className="resize-none h-20 text-sm"
                      value={clue.text}
                      onChange={(e) => updateClueText(clue.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Right Column (Preview & Actions) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Section 6: Validation Errors */}
          {errors.length > 0 && (
            <Card className="border-red-200 bg-red-50/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-700 text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Validation Errors
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-red-600">
                <ul className="list-disc pl-5 space-y-1">
                  {errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Section 5: Live Preview */}
          <Card className="border-slate-200 shadow-sm sticky top-6">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                Live Preview
              </CardTitle>
              <CardDescription>This is exactly how players will see the puzzle.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              
              <div className="w-full max-w-[250px] mx-auto aspect-square mb-6">
                <div 
                  className="grid bg-slate-900 border border-slate-900 w-full h-full"
                  style={{ 
                    gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                    gap: '1px'
                  }}
                >
                  {grid.map((row, r) => (
                    row.map((cell, c) => (
                      <div 
                        key={`prev-${r}-${c}`} 
                        className={`relative flex items-center justify-center w-full h-full ${cell.isBlack ? 'bg-slate-900' : 'bg-white'}`}
                      >
                        {!cell.isBlack && cell.clueNum && (
                          <span className="absolute top-0.5 left-1 text-[8px] font-bold text-slate-600 leading-none">
                            {cell.clueNum}
                          </span>
                        )}
                        {/* Note: Players don't see answers initially, but in preview we can hide them or show them faintly. Let's show empty for pure preview */}
                      </div>
                    ))
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Across</h4>
                  <ul className="text-xs space-y-1 text-slate-600">
                    {acrossClues.map(c => (
                      <li key={c.id}><span className="font-bold mr-1">{c.number}.</span> {c.text || "..."}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Down</h4>
                  <ul className="text-xs space-y-1 text-slate-600">
                    {downClues.map(c => (
                      <li key={c.id}><span className="font-bold mr-1">{c.number}.</span> {c.text || "..."}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </CardContent>
            
            {/* Section 7: Actions */}
            <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
              <Button onClick={runValidation} variant="outline" className="w-full border-slate-300 bg-white">
                <CheckCircle className="h-4 w-4 mr-2" /> Validate Only
              </Button>
              <div className="flex gap-3 w-full">
                <Button onClick={handleSaveDraft} variant="secondary" className="flex-1">Save Draft</Button>
                <Button onClick={handlePublish} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Publish</Button>
              </div>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  );
}
