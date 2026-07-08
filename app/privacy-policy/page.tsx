import { PublicLayout } from "@/components/public/PublicLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Heritage Stackers",
  description: "Privacy Policy for Heritage Stackers describing how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
            Privacy Policy
          </h1>
          <p className="text-slate-300 font-medium max-w-2xl text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200">
        <div className="prose prose-slate max-w-none">
          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, submit a giveaway entry, or contact us for support. This may include your name, email address, and shipping information if you win a prize.</p>
          <p>We also automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our website.</p>

          <h3>2. How We Use Your Information</h3>
          <p>We use personal information collected via our website for a variety of business purposes described below:</p>
          <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To administer giveaways, select winners, and deliver prizes.</li>
            <li>To send administrative information to you.</li>
            <li>To deliver targeted advertising to you (via Google AdSense).</li>
            <li>To protect our Services from fraud.</li>
          </ul>

          <h3>3. Cookies and Tracking Technologies</h3>
          <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <a href="/cookie-policy" className="text-[#D4AF37] hover:underline">Cookie Policy</a>.</p>

          <h3>4. Google AdSense & Analytics</h3>
          <p>We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. We also use Google AdSense to publish ads. When you view or click on an ad, a cookie will be set to help better provide advertisements that may be of interest to you.</p>

          <h3>5. Data Retention</h3>
          <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>

          <h3>6. Contact Us</h3>
          <p>If you have questions or comments about this notice, you may email us at support@heritagestackers.com.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
