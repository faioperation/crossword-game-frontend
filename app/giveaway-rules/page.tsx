import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Giveaway Rules | Heritage Stackers",
  description: "Official rules and eligibility requirements for the Heritage Stackers daily crossword giveaway.",
};

export default function RulesPage() {
  return (
    <PublicLayout>
      <div className="py-12">
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
                Giveaway Rules
              </h1>
            </div>
            <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37]">
              <FileText className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Rules Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="max-w-none">
            
            <p className="text-slate-600 font-medium mb-6">
              Effective Date: July 10, 2026
            </p>
            
            <p className="text-lg font-medium text-slate-700 leading-relaxed mb-4">
              These Giveaway Rules apply to the Heritage Stackers Daily Mini Crossword giveaway available at HeritageStackers.com.
            </p>
            <p className="font-semibold text-slate-800 leading-relaxed mb-8">By entering, you agree to follow these rules.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">No Purchase Necessary</h2>
            <p className="text-slate-600 leading-relaxed mb-4">No purchase is necessary to enter or win.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Making a purchase does not increase your chances of winning.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Sponsor</h2>
            <p className="text-slate-600 leading-relaxed mb-4">The giveaway is sponsored by Heritage Stackers.</p>
            <p className="text-slate-600 leading-relaxed mb-4"><strong>Sponsor contact:</strong><br/>
              Heritage Stackers<br/>
              Email: <a href="mailto:giveaway@heritagestackers.com" className="text-blue-600 hover:underline">giveaway@heritagestackers.com</a>
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Eligibility</h2>
            <p className="text-slate-600 leading-relaxed mb-4">The giveaway is open to legal residents of the United States who are 18 years of age or older at the time of entry.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Void where prohibited by law.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Employees, contractors, agents, affiliates, and immediate family members of Heritage Stackers may be excluded from winning at the sole discretion of Heritage Stackers.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Entry Period</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Each daily giveaway begins and ends according to the date and time displayed on the website.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Unless otherwise stated, each giveaway period runs for one calendar day based on the website's selected time zone.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">How To Enter</h2>
            <p className="text-slate-600 leading-relaxed mb-4">There are two ways to enter:</p>
            <ol className="list-decimal list-inside text-slate-600 mb-6 space-y-2 ml-4">
              <li>Complete the daily mini crossword and submit the giveaway entry form.</li>
              <li>Use the alternate entry method provided on the website.</li>
            </ol>
            <p className="text-slate-600 leading-relaxed mb-4">Each person may enter once per day unless otherwise stated.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Duplicate, fake, automated, fraudulent, or incomplete entries may be disqualified.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Daily Prize</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Each day may feature a different prize.</p>
            <p className="text-slate-600 leading-relaxed mb-4">The daily prize will be displayed on the website before entry.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Example prizes may include silver coins, collectible coins, bullion-related items, or other prizes chosen by Heritage Stackers.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Prize images may be for display purposes only. Actual prize may vary slightly depending on availability.</p>
            <p className="text-slate-600 leading-relaxed mb-4">No cash substitute is guaranteed.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Heritage Stackers reserves the right to substitute a prize of equal or greater approximate value if the listed prize becomes unavailable.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Winner Selection</h2>
            <p className="text-slate-600 leading-relaxed mb-4">One winner may be selected randomly from eligible entries for the applicable giveaway period.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Winner selection may be conducted automatically or manually through the website's admin system.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Odds of winning depend on the number of eligible entries received.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Winner Notification</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Winners will be notified by email using the email address provided at entry.</p>
            <p className="text-slate-600 leading-relaxed mb-4">The winner may be asked to provide a valid mailing address so the prize can be shipped.</p>
            <p className="text-slate-600 leading-relaxed mb-4">If a winner does not respond within 7 days, provides incomplete information, or is found to be ineligible, Heritage Stackers may select an alternate winner.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Shipping</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Prizes will be shipped to the mailing address provided by the winner.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Heritage Stackers is not responsible for lost, stolen, delayed, misdirected, or undeliverable mail after the prize has been shipped.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Taxes</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Winners are responsible for any taxes, fees, or reporting obligations related to accepting a prize.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Disqualification</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Heritage Stackers may disqualify any entry or participant for:</p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2 ml-4">
              <li>Duplicate entries</li>
              <li>Fake information</li>
              <li>Automated submissions</li>
              <li>Abuse of the website</li>
              <li>Attempted manipulation of the giveaway</li>
              <li>Violation of these rules</li>
              <li>Any behavior Heritage Stackers determines to be unfair, fraudulent, or harmful</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Changes or Cancellation</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Heritage Stackers reserves the right to modify, suspend, or cancel a giveaway if technical issues, fraud, platform problems, or other circumstances affect the fairness or operation of the giveaway.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">General Conditions</h2>
            <p className="text-slate-600 leading-relaxed mb-4">By entering, participants agree to release Heritage Stackers from claims related to participation in the giveaway or acceptance/use of any prize.</p>
            <p className="text-slate-600 leading-relaxed mb-4">This giveaway is not sponsored, endorsed, administered by, or associated with Instagram, Whatnot, Google, Apple, Facebook, Meta, or any other third-party platform unless expressly stated.</p>
            
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-100 justify-center">
            <Link href="/">
              <Button size="lg" className="rounded-full font-bold shadow-md bg-[#D4AF37] hover:bg-[#b08d29] text-white w-full sm:w-auto px-8 transition-transform hover:scale-105">
                Back to Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto px-8 text-slate-600 hover:text-slate-900 transition-transform hover:scale-105">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
