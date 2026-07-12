import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Heritage Stackers",
  description: "Learn how Heritage Stackers uses cookies, Google Analytics, and AdSense tracking on our website.",
};

export default function CookiePolicyPage() {
  return (
    <PublicLayout>
      <div className="py-12">
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
                Cookie Policy
              </h1>
            </div>
            <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Cookie className="w-8 h-8" />
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
              This Cookie Policy explains how HeritageStackers.com may use cookies and similar technologies.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">What Are Cookies?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Cookies are small files stored on your device when you visit a website.</p>
            <p className="text-slate-600 leading-relaxed mb-4">They help websites function, remember preferences, measure traffic, and improve user experience.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">How We Use Cookies</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may use cookies for:</p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2 ml-4">
              <li>Website functionality</li>
              <li>User login sessions</li>
              <li>Security</li>
              <li>Fraud prevention</li>
              <li>Analytics</li>
              <li>Advertising</li>
              <li>Performance tracking</li>
              <li>Remembering preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Types of Cookies We May Use</h2>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Essential Cookies</h3>
            <p className="text-slate-600 leading-relaxed mb-4">These help the website work properly.</p>
            <p className="text-slate-600 leading-relaxed mb-4">They may be used for login sessions, security, form submissions, and basic website functions.</p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Analytics Cookies</h3>
            <p className="text-slate-600 leading-relaxed mb-4">These help us understand how visitors use the website.</p>
            <p className="text-slate-600 leading-relaxed mb-4">We may use analytics tools such as Google Analytics or similar services.</p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Advertising Cookies</h3>
            <p className="text-slate-600 leading-relaxed mb-4">We may use advertising cookies through services such as Google AdSense, Playwire, or other advertising partners.</p>
            <p className="text-slate-600 leading-relaxed mb-4">These cookies may help display ads, measure ad performance, and improve ad relevance.</p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Third-Party Cookies</h3>
            <p className="text-slate-600 leading-relaxed mb-4">Some cookies may be placed by third-party services used on the website, including analytics, advertising, hosting, security, or email tools.</p>
            <p className="text-slate-600 leading-relaxed mb-4">These third parties may collect information according to their own policies.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Managing Cookies</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Most browsers allow you to block, delete, or manage cookies through browser settings.</p>
            <p className="text-slate-600 leading-relaxed mb-4">If you disable cookies, some parts of the website may not work properly.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Updates</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may update this Cookie Policy from time to time.</p>
            <p className="text-slate-600 leading-relaxed mb-4">The updated version will be posted on this page.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Contact</h2>
            <p className="text-slate-600 leading-relaxed mb-4">For cookie-related questions, contact:<br />
              <a href="mailto:giveaway@heritagestackers.com" className="text-blue-600 hover:underline">giveaway@heritagestackers.com</a>
            </p>
            
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
