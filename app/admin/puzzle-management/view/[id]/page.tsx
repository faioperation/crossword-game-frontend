"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Eye, ArrowLeft, Loader2 } from "lucide-react";
import { apiGet } from "@/lib/apiClient";

export default function ViewPuzzlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [puzzle, setPuzzle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchPuzzle = async () => {
      try {
        const res = await apiGet<any>(`/system-owner/puzzle/${id}`);
        if (res.success && res.data) {
          setPuzzle(res.data);
        } else {
          toast.error("Failed to load puzzle details.");
        }
      } catch (error) {
        console.error("Fetch puzzle error", error);
        toast.error("Error fetching puzzle.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPuzzle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-500">Loading puzzle details...</p>
      </div>
    );
  }

  if (!puzzle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-500 mb-4">Puzzle not found.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const safeClues = typeof puzzle.clues === 'string' ? JSON.parse(puzzle.clues) : (puzzle.clues || []);
  const acrossClues = safeClues.filter((c: any) => c.direction?.toLowerCase() === "across");
  const downClues = safeClues.filter((c: any) => c.direction?.toLowerCase() === "down");

  const safeGrid = typeof puzzle.grid === 'string' ? JSON.parse(puzzle.grid) : (puzzle.grid || []);

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white border border-slate-200">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">View Puzzle</h2>
          <p className="text-slate-500 font-medium text-base mt-1">Viewing puzzle details (Read-only)</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Section 1: Information */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800">1. Puzzle Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Puzzle Title</label>
                <Input value={puzzle.title || ""} disabled className="bg-slate-100 border-slate-200 text-slate-700 cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Publish Date</label>
                <Input type="date" value={puzzle.date || ""} disabled className="bg-slate-100 border-slate-200 text-slate-700 cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Difficulty</label>
                <Input value={puzzle.difficulty || ""} disabled className="bg-slate-100 border-slate-200 text-slate-700 cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <Input value={puzzle.status || ""} disabled className="bg-slate-100 border-slate-200 text-slate-700 cursor-not-allowed" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-700">Daily Prize</label>
                <Input value={puzzle.prize || ""} disabled className="bg-slate-100 border-slate-200 text-slate-700 cursor-not-allowed" />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Grid Builder (Read-only) */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800">2. Grid</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center">
              <div className="mb-4 self-start flex items-center gap-4">
                <label className="text-sm font-semibold text-slate-700">Grid Size:</label>
                <Input value={`${puzzle.size} x ${puzzle.size}`} disabled className="w-24 bg-slate-100 border-slate-200 text-slate-700 cursor-not-allowed text-center" />
              </div>

              <div className="w-full max-w-[500px] aspect-square mx-auto">
                <div 
                  className="grid bg-slate-900 border-2 border-slate-900 w-full h-full"
                  style={{ 
                    gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))`,
                    gap: '2px'
                  }}
                >
                {safeGrid.map((row: any, r: number) => (
                  row.map((cell: any, c: number) => (
                    <div 
                      key={`${r}-${c}`} 
                      className={`relative flex items-center justify-center w-full h-full ${cell.isBlack ? 'bg-slate-900' : 'bg-slate-100'}`}
                    >
                      {!cell.isBlack && cell.clueNum && (
                        <span className="absolute top-1 left-1.5 sm:top-1.5 sm:left-2 text-[10px] sm:text-sm font-bold text-slate-500 pointer-events-none select-none z-10 leading-none">
                          {cell.clueNum}
                        </span>
                      )}
                      {!cell.isBlack && (
                        <div className="w-full h-full flex items-center justify-center text-2xl sm:text-4xl font-bold uppercase text-slate-700 select-none">
                          {cell.letter}
                        </div>
                      )}
                    </div>
                  ))
                ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 & 4: Clues Editor (Read-only) */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800">3 & 4. Clues</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid sm:grid-cols-2 gap-8">
              
              {/* Across */}
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-slate-800 border-b border-slate-200 pb-2">Across</h3>
                {acrossClues.length === 0 && <p className="text-sm text-slate-500">No across words detected.</p>}
                {acrossClues.map((clue: any) => (
                  <div key={clue.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">{clue.number}</span>
                      <span className="text-sm font-mono font-semibold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">{clue.answer || "[Empty]"}</span>
                    </div>
                    <Textarea 
                      disabled
                      className="resize-none h-20 text-sm bg-slate-100 text-slate-700 cursor-not-allowed"
                      value={clue.text}
                    />
                  </div>
                ))}
              </div>

              {/* Down */}
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg text-slate-800 border-b border-slate-200 pb-2">Down</h3>
                {downClues.length === 0 && <p className="text-sm text-slate-500">No down words detected.</p>}
                {downClues.map((clue: any) => (
                  <div key={clue.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">{clue.number}</span>
                      <span className="text-sm font-mono font-semibold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded">{clue.answer || "[Empty]"}</span>
                    </div>
                    <Textarea 
                      disabled
                      className="resize-none h-20 text-sm bg-slate-100 text-slate-700 cursor-not-allowed"
                      value={clue.text}
                    />
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Right Column (Preview) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
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
                    gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))`,
                    gap: '1px'
                  }}
                >
                  {safeGrid.map((row: any, r: number) => (
                    row.map((cell: any, c: number) => (
                      <div 
                        key={`prev-${r}-${c}`} 
                        className={`relative flex items-center justify-center w-full h-full ${cell.isBlack ? 'bg-slate-900' : 'bg-white'}`}
                      >
                        {!cell.isBlack && cell.clueNum && (
                          <span className="absolute top-0.5 left-1 text-[8px] font-bold text-slate-600 leading-none">
                            {cell.clueNum}
                          </span>
                        )}
                        {!cell.isBlack && cell.letter && (
                          <span className="text-sm font-bold text-slate-800 uppercase select-none">{cell.letter}</span>
                        )}
                      </div>
                    ))
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Across</h4>
                  <ul className="text-xs space-y-1 text-slate-600">
                    {acrossClues.map((c: any) => (
                      <li key={c.id}><span className="font-bold mr-1">{c.number}.</span> {c.text || "..."}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">Down</h4>
                  <ul className="text-xs space-y-1 text-slate-600">
                    {downClues.map((c: any) => (
                      <li key={c.id}><span className="font-bold mr-1">{c.number}.</span> {c.text || "..."}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
