import { ScrollText } from "lucide-react";

export function Rules() {
  return (
    <div className="w-full space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
      <p>Use the clues to fill in the crossword grid with the correct answers.</p>

      <div className="space-y-2">
        <p className="font-semibold text-slate-800">To choose a clue:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>On tablet or desktop, tap a clue from the clue list.</li>
          <li>On mobile, use the &lt; and &gt; buttons to move between clues.</li>
          <li>You can also tap any square in the grid to highlight its clue.</li>
        </ul>
      </div>

      <p>Type your answer into the grid.</p>

      <p>To erase a letter, tap the delete button. Keep tapping delete to remove more letters.</p>

      <p>To change a letter, tap the square you want to fix and type the new letter.</p>

      <p>At any time, you can tap the Check button to see which letters are incorrect.</p>
    </div>
  );
}
