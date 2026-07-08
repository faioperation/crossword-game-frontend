import { PublicLayout } from "@/components/public/PublicLayout";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
            Contact Us
          </h1>
          <p className="text-slate-300 font-medium max-w-2xl text-lg mx-auto sm:mx-0">
            Have a question, feedback, or need help with a prize claim? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center sm:text-left">Get in Touch</h3>
          <p className="text-slate-600 mb-10 text-center sm:text-left leading-relaxed">
            Our support team is available to assist you with any inquiries regarding the daily crossword puzzle, our giveaways, or general questions. Please reach out to us via email, and we will get back to you as soon as possible.
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100 transition-colors hover:border-slate-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wider text-slate-500 uppercase mb-1">Email Support</p>
                <a href="mailto:support@heritagestackers.com" className="text-lg font-semibold text-[#D4AF37] hover:underline transition-all">
                  support@heritagestackers.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100 transition-colors hover:border-slate-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wider text-slate-500 uppercase mb-1">Location</p>
                <p className="text-lg font-semibold text-slate-700">
                  Global (Online Daily Crossword Platform)
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </PublicLayout>
  );
}
