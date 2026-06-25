import { PrizeInformation } from "@/components/public/PrizeInformation";
import { WinnersList } from "@/components/public/WinnersList";
import { Rules } from "@/components/public/Rules";
import { AlternateEntryForm } from "@/components/public/AlternateEntryForm";
import type { Prize, Winner } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2 } from "lucide-react";

// Mock Data
const mockPrize: Prize = {
  id: "prize-1",
  name: "$100 Amazon Gift Card",
  description: "Solve today's crossword puzzle for a chance to win a $100 Amazon Gift Card! Only one entry per day is allowed.",
  imageUrl: "https://placehold.co/600x400/png?text=Amazon+Gift+Card",
};

const mockWinners: Winner[] = [
  { id: "w-1", name: "Jane Smith", prizeName: "Nintendo Switch", winningDate: "2026-06-24T00:00:00Z" },
  { id: "w-2", name: "Bob Johnson", prizeName: "$50 Steam Wallet", winningDate: "2026-06-23T00:00:00Z" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="bg-background border-b px-6 py-4 flex items-center gap-2 sticky top-0 z-10">
        <Gamepad2 className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tight">Daily Crossword Giveaway</h1>
      </header>
      
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8 space-y-12">
        <section className="space-y-4">
          <PrizeInformation prize={mockPrize} />
        </section>

        <section className="space-y-4">
          <Card className="w-full border-primary border-2 shadow-sm">
            <CardHeader>
              <CardTitle>Today's Puzzle</CardTitle>
              <CardDescription>Crossword Grid Component Will Go Here (Phase 3)</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[400px] bg-muted/50 rounded-lg">
              <p className="text-muted-foreground font-medium">Crossword Puzzle Loading...</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <WinnersList winners={mockWinners} />
            <Rules />
          </div>
          <div>
            <AlternateEntryForm />
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-6 text-center text-sm text-muted-foreground mt-auto">
        <p>&copy; {new Date().getFullYear()} Daily Crossword Giveaway. All rights reserved.</p>
      </footer>
    </div>
  );
}
