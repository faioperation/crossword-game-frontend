import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Heritage Stackers",
  description: "Privacy Policy for Heritage Stackers describing how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <div className="py-12">
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
                Privacy Policy
              </h1>
            </div>
            <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Shield className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="max-w-none">
            
            <p className="text-slate-600 font-medium mb-6">
              Effective Date: July 10, 2026
            </p>
            
            <p className="text-lg font-medium text-slate-700 leading-relaxed mb-4">
              Heritage Stackers respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you use HeritageStackers.com.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may collect information you provide directly, including:</p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2 ml-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number, if submitted</li>
              <li>Mailing address, if you are selected as a winner</li>
              <li>Giveaway entry information</li>
              <li>Account registration information</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mb-4">We may also collect basic technical information, including:</p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2 ml-4">
              <li>IP address</li>
              <li>Device/browser information</li>
              <li>Pages visited</li>
              <li>Date and time of visit</li>
              <li>Puzzle participation activity</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">How We Use Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may use your information to:</p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2 ml-4">
              <li>Operate the daily crossword and giveaway</li>
              <li>Verify entries</li>
              <li>Prevent duplicate or fraudulent entries</li>
              <li>Contact winners</li>
              <li>Ship prizes</li>
              <li>Respond to support requests</li>
              <li>Improve the website</li>
              <li>Monitor website performance</li>
              <li>Send promotional emails if you opt in</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Giveaway Entries</h2>
            <p className="text-slate-600 leading-relaxed mb-4">When you enter a giveaway, we use your information to manage the entry, select winners, notify winners, and ship prizes.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Email Communications</h2>
            <p className="text-slate-600 leading-relaxed mb-4">If you win, we may email you to request your mailing address.</p>
            <p className="text-slate-600 leading-relaxed mb-4">If you opt in to promotional messages, we may send updates about Heritage Stackers. You may unsubscribe where applicable.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Cookies and Analytics</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may use cookies, analytics tools, and similar technologies to understand website traffic and improve user experience.</p>
            <p className="text-slate-600 leading-relaxed mb-4">We may use services such as Google Analytics, Google AdSense, Playwire, or similar advertising/analytics providers.</p>
            <p className="text-slate-600 leading-relaxed mb-4">These third-party services may collect information according to their own privacy policies.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Advertising</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may display advertisements on the website.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Advertising partners may use cookies or similar technologies to show ads, measure performance, and improve ad relevance.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Information Sharing</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We do not sell your personal information.</p>
            <p className="text-slate-600 leading-relaxed mb-4">We may share information with service providers who help us operate the website, send emails, process analytics, prevent fraud, or ship prizes.</p>
            <p className="text-slate-600 leading-relaxed mb-4">We may also disclose information if required by law or to protect our rights, users, or business.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Data Security</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We use reasonable measures to protect your information.</p>
            <p className="text-slate-600 leading-relaxed mb-4">However, no website or online system can be guaranteed 100% secure.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Children’s Privacy</h2>
            <p className="text-slate-600 leading-relaxed mb-4">This website is intended for users 18 years of age or older.</p>
            <p className="text-slate-600 leading-relaxed mb-4">We do not knowingly collect personal information from children under 13.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Your Choices</h2>
            <p className="text-slate-600 leading-relaxed mb-4">You may contact us to request that we update or delete certain personal information, subject to legal, operational, and fraud-prevention needs.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Contact</h2>
            <p className="text-slate-600 leading-relaxed mb-4">For privacy questions, contact:<br />
              <a href="mailto:giveaway@heritagestackers.com" className="text-blue-600 hover:underline">giveaway@heritagestackers.com</a>
            </p>
            
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
