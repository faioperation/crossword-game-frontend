import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Giveaway Rules | Heritage Stackers",
  description: "Official rules and eligibility requirements for the Heritage Stackers daily crossword giveaway.",
};

export default function RulesPage() {
  return (
    <PublicLayout>
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
            Official Giveaway Rules
          </h1>
          <p className="text-slate-300 font-medium max-w-2xl text-lg">
            Everything you need to know about participating, winning, and claiming your prizes.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200">
        <div className="prose prose-slate max-w-none">
          <h3>1. Eligibility</h3>
          <p>The Heritage Stackers Daily Crossword Giveaway is open to individuals who are 18 years of age or older at the time of entry. Void where prohibited by law. Employees, officers, and directors of Heritage Stackers and their immediate family members are not eligible to participate.</p>

          <h3>2. How to Enter</h3>
          <p>Participants can enter the daily giveaway by successfully completing the daily mini crossword puzzle and submitting the entry form. An alternative method of entry (AMOE) is also provided via the "Alternative Entry Form" available on the homepage. No purchase is necessary to enter or win. A purchase does not increase the chances of winning.</p>

          <h3>3. Daily Participation Limits</h3>
          <p>Limit one (1) entry per person, per email address, per day, regardless of the method of entry. Subsequent entries submitted by the same person or email address on the same day will be disqualified.</p>

          <h3>4. Winner Selection</h3>
          <p>One (1) winner will be selected daily in a random drawing from among all eligible entries received that day. The drawing will be conducted within 24 hours of the puzzle's expiration.</p>

          <h3>5. Prize Claim Process</h3>
          <p>Winners will be notified via the email address provided at the time of entry. The winner must respond to the notification within seven (7) days to claim the prize and provide shipping details. If a winner fails to respond within the timeframe, the prize will be forfeited, and an alternate winner may be selected.</p>

          <h3>6. Fraud Prevention and Disqualification</h3>
          <p>Heritage Stackers reserves the right to disqualify any participant found to be tampering with the entry process, using automated entry software (bots), submitting false information, or violating these Official Rules. Duplicate IP addresses submitting massive volumes of entries will be banned.</p>

          <h3>7. Sponsor Information</h3>
          <p>The giveaway is sponsored by Heritage Stackers. This promotion is in no way sponsored, endorsed, administered by, or associated with Google, Apple, Facebook, or Twitter.</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-100">
            <Link href="/">
              <Button size="lg" className="rounded-full font-bold shadow-md bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white w-full sm:w-auto">
                Play Today's Puzzle
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
