import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Heritage Stackers",
  description: "Terms of Service and terms of use for the Heritage Stackers website and daily crossword giveaways.",
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
            Terms of Service
          </h1>
          <p className="text-slate-300 font-medium max-w-2xl text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200">
        <div className="prose prose-slate max-w-none">
          <h3>1. Agreement to Terms</h3>
          <p>These Terms of Service constitute a legally binding agreement made between you and Heritage Stackers concerning your access to and use of our website as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto.</p>

          <h3>2. User Responsibilities</h3>
          <p>By using the Site, you represent and warrant that:</p>
          <ul>
            <li>All registration and entry information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
          </ul>

          <h3>3. Giveaway Participation</h3>
          <p>Participation in our daily giveaways is strictly subject to our <a href="/giveaway-rules" className="text-[#D4AF37] hover:underline">Giveaway Rules</a>. Any attempt to artificially manipulate entries, use automated solving bots, or submit duplicate entries from alternate accounts will result in immediate disqualification and permanent ban from the platform.</p>

          <h3>4. Intellectual Property</h3>
          <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>

          <h3>5. Limitation of Liability</h3>
          <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.</p>

          <h3>6. Modifications and Interruptions</h3>
          <p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
