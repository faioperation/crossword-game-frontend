import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Heritage Stackers",
  description: "Learn how Heritage Stackers uses cookies, Google Analytics, and AdSense tracking on our website.",
};

export default function CookiePolicyPage() {
  return (
    <PublicLayout>
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
            Cookie Policy
          </h1>
          <p className="text-slate-300 font-medium max-w-2xl text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200">
        <div className="prose prose-slate max-w-none">
          <h3>What are Cookies?</h3>
          <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>

          <h3>How We Use Cookies</h3>
          <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. Specifically, we use cookies for:</p>
          <ul>
            <li><strong>Essential operations:</strong> Saving your crossword puzzle progress locally so you don't lose it if you refresh the page.</li>
            <li><strong>Analytics:</strong> Tracking website usage via Google Analytics to understand how visitors interact with our platform.</li>
            <li><strong>Advertising:</strong> Showing relevant advertisements via Google AdSense and managing ad delivery frequency.</li>
          </ul>

          <h3>Google AdSense and Advertising Cookies</h3>
          <p>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>
          <p>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://youradchoices.com/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">www.aboutads.info</a>.</p>

          <h3>Managing Cookies</h3>
          <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted (for example, your puzzle progress may not save).</p>
        </div>
      </div>
    </PublicLayout>
  );
}
