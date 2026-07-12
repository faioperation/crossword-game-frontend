import { PublicLayout } from "@/components/public/PublicLayout";
import { Mail, Globe, CheckCircle2 } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="py-12">
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
              Contact Us
            </h1>
            <p className="text-slate-300 font-medium max-w-2xl text-lg mx-auto sm:mx-0">
              Have a question about the Heritage Stackers Daily Mini Crossword, a giveaway entry, or a prize?<br className="hidden sm:block"/>
              You can contact us using the information below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-colors hover:border-slate-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 shadow-inner">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wider text-slate-500 uppercase mb-1">Email</p>
                <a href="mailto:giveaway@heritagestackers.com" className="text-lg font-semibold text-[#D4AF37] hover:underline transition-all">
                  giveaway@heritagestackers.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-colors hover:border-slate-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 shadow-inner">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wider text-slate-500 uppercase mb-1">Website</p>
                <a href="https://HeritageStackers.com" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-slate-800 hover:text-[#D4AF37] transition-all">
                  HeritageStackers.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-colors hover:border-slate-300">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 text-pink-600 shadow-inner">
                <SiInstagram className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wider text-slate-500 uppercase mb-1">Instagram</p>
                <a href="https://instagram.com/heritagestackers" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-slate-800 hover:text-[#D4AF37] transition-all">
                  @heritagestackers
                </a>
              </div>
            </div>
          </div>

          {/* Giveaway Questions Guidelines */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Giveaway Questions</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              For giveaway-related questions, please include:
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 font-medium">Your name</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 font-medium">Email used to enter</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 font-medium">Date of the giveaway</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 font-medium">Description of your issue or question</span>
              </li>
            </ul>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-600 italic text-center font-medium">
                We do our best to respond as quickly as possible.
              </p>
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
