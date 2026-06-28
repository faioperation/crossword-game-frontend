import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";
import type { Winner } from "@/types";

export function WinnersList({ winners }: { winners: Winner[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Recent Winners
        </CardTitle>
        <CardDescription>Congratulations to our previous crossword solvers!</CardDescription>
      </CardHeader>
      <CardContent>
        {winners.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No winners yet. Be the first!</p>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Winner Name</TableHead>
                  <TableHead>Prize</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {winners.map((winner) => (
                  <TableRow key={winner.id}>
                    <TableCell className="font-medium">
                      {new Date(winner.winningDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{winner.name}</TableCell>
                    <TableCell className="font-semibold text-primary">{winner.prizeName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
