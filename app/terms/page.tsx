import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Heritage Stackers",
  description: "Terms of Service and terms of use for the Heritage Stackers website and daily crossword giveaways.",
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="py-12">
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
                Terms of Service
              </h1>
            </div>
            <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Scale className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="max-w-none">
            
            <p className="text-slate-600 font-medium mb-6">
              Effective Date: July 10, 2026
            </p>
            
            <p className="text-lg font-medium text-slate-700 leading-relaxed mb-4">
              Welcome to HeritageStackers.com.
            </p>
            <p className="text-lg font-medium text-slate-700 leading-relaxed mb-4">
              By using this website, you agree to these Terms of Service.
            </p>
            <p className="text-lg font-medium text-slate-700 leading-relaxed mb-4">
              If you do not agree, please do not use the website.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Use of Website</h2>
            <p className="text-slate-600 leading-relaxed mb-4">HeritageStackers.com provides a daily mini crossword experience, giveaway entry features, informational content, and related services.</p>
            <p className="text-slate-600 leading-relaxed mb-4">You agree to use the website only for lawful purposes.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Accounts</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Some features may require an account.</p>
            <p className="text-slate-600 leading-relaxed mb-4">You are responsible for keeping your login information secure.</p>
            <p className="text-slate-600 leading-relaxed mb-4">You agree not to create fake accounts, impersonate others, or use automated systems to abuse the website.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Giveaway Participation</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Giveaway participation is subject to the separate Giveaway Rules posted on the website.</p>
            <p className="text-slate-600 leading-relaxed mb-4">No purchase is necessary to enter or win.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Heritage Stackers may disqualify entries that are duplicate, fraudulent, automated, incomplete, or otherwise violate the rules.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed mb-4">All website content, branding, text, graphics, puzzle layouts, and related materials are owned by or licensed to Heritage Stackers unless otherwise stated.</p>
            <p className="text-slate-600 leading-relaxed mb-4">You may not copy, reproduce, sell, or misuse website content without permission.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">User Conduct</h2>
            <p className="text-slate-600 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2 ml-4">
              <li>Interfere with website operation</li>
              <li>Attempt to hack, scrape, or overload the website</li>
              <li>Submit fake or misleading information</li>
              <li>Abuse giveaway entry systems</li>
              <li>Violate any applicable law</li>
              <li>Use the website in a way that harms Heritage Stackers or other users</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Website Availability</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We aim to keep the website available and functional, but we do not guarantee uninterrupted access.</p>
            <p className="text-slate-600 leading-relaxed mb-4">The website may be updated, modified, suspended, or discontinued at any time.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Prizes and Giveaways</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Prize availability, winner selection, eligibility, and claim requirements are governed by the Giveaway Rules.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Heritage Stackers may substitute prizes, cancel giveaways, or disqualify participants as described in those rules.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Third-Party Services</h2>
            <p className="text-slate-600 leading-relaxed mb-4">The website may use third-party services for hosting, analytics, advertising, email, security, and other functions.</p>
            <p className="text-slate-600 leading-relaxed mb-4">We are not responsible for the actions, policies, or content of third-party services.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Disclaimer</h2>
            <p className="text-slate-600 leading-relaxed mb-4">The website is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;</p>
            <p className="text-slate-600 leading-relaxed mb-4">Heritage Stackers makes no guarantee that the website will always be error-free, secure, or uninterrupted.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed mb-4">To the fullest extent permitted by law, Heritage Stackers is not liable for indirect, incidental, special, consequential, or punitive damages related to use of the website, participation in giveaways, or acceptance/use of prizes.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may update these Terms of Service at any time.</p>
            <p className="text-slate-600 leading-relaxed mb-4">Continued use of the website means you accept the updated terms.</p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 pb-2 border-b border-slate-100">Contact</h2>
            <p className="text-slate-600 leading-relaxed mb-4">For questions about these Terms, contact:<br />
              <a href="mailto:giveaway@heritagestackers.com" className="text-blue-600 hover:underline">giveaway@heritagestackers.com</a>
            </p>
            
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
