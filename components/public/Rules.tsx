import { ScrollText } from "lucide-react";

export function Rules() {
  return (
    <div className="w-full space-y-6 text-slate-700 leading-relaxed text-sm md:text-base p-4">
      <p>
        Use the clues to fill the grid with the correct solution words.
        Tap a clue from the scrollable clue lists (tablet and desktop),
        press the &lt; and &gt; buttons (mobile), or select a cell within the
        grid to highlight a clue. Type in your solution answer.
      </p>

      <p>
        To erase a letter during entry of a solution, simply tap the
        delete button to erase last letter entry, and repeat to continue
        to delete each letter previously entered.
      </p>

      <p>
        To amend a letter, select the cell and over-type with your
        replacement letter. At any time during play, you can select the
        Check button to reveal incorrect inputs.
      </p>
    </div>
  );
}
