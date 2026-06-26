"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PuzzleManagementPage() {
  const dummyPuzzles = [
    { id: "PZ-001", title: "Daily Mini Crossword", date: "2026-06-26", status: "Active" },
    { id: "PZ-002", title: "Weekend Special", date: "2026-06-27", status: "Draft" },
    { id: "PZ-003", title: "Flash Puzzle", date: "2026-06-28", status: "Draft" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Puzzle Management</h2>
          <p className="text-muted-foreground">Manage your crossword puzzles here.</p>
        </div>
        <Button onClick={() => toast.success("Opening puzzle creator...")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Puzzle
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>All Puzzles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyPuzzles.map((puzzle) => (
                <TableRow key={puzzle.id}>
                  <TableCell className="font-medium">{puzzle.id}</TableCell>
                  <TableCell>{puzzle.title}</TableCell>
                  <TableCell>{puzzle.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${puzzle.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                      {puzzle.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
