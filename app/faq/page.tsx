"use client";

import { PublicLayout } from "@/components/public/PublicLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is the Heritage Stackers Daily Mini Crossword?",
    a: "It is a free daily mini crossword puzzle where users can solve the puzzle and enter for a chance to win the daily prize.",
  },
  {
    q: "Do I need to buy anything to enter?",
    a: "No. No purchase is necessary to enter or win.",
  },
  {
    q: "How often can I enter?",
    a: "Unless otherwise stated, each person may enter once per day.",
  },
  {
    q: "What can I win?",
    a: "The daily prize will be shown on the website. Prizes may include silver coins, collectible coins, bullion-related items, or other prizes selected by Heritage Stackers.",
  },
  {
    q: "How is the winner chosen?",
    a: "A winner is selected from eligible entries for the applicable giveaway period.",
  },
  {
    q: "How will I know if I won?",
    a: "Winners will be contacted by email. Make sure the email address you submit is accurate.",
  },
  {
    q: "What happens if I do not respond?",
    a: "If a winner does not respond within 7 days, Heritage Stackers may select another winner.",
  },
  {
    q: "Can I enter without solving the crossword?",
    a: "Yes. A no-purchase-necessary alternate entry option is available on the website.",
  },
  {
    q: "Why do you collect my email address?",
    a: "We collect your email so we can verify your entry, notify winners, and operate the giveaway. If you choose to receive promotional messages, we may also send updates from Heritage Stackers. You can opt out of marketing emails where applicable.",
  },
  {
    q: "Is my information shared?",
    a: "We do not sell your personal information. Please review our Privacy Policy for more details.",
  },
  {
    q: "Is this connected to Whatnot or Instagram?",
    a: "No. Unless specifically stated, this giveaway is not sponsored, endorsed, administered by, or associated with Whatnot, Instagram, Meta, Google, Apple, or any other third-party platform.",
  },
  {
    q: "Who can I contact with questions?",
    a: "You can contact Heritage Stackers at giveaway@heritagestackers.com.",
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PublicLayout>
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE87C] via-white to-[#D4AF37]">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 font-medium max-w-2xl text-lg">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-8">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border rounded-xl overflow-hidden transition-colors duration-200 ${isOpen ? 'border-[#D4AF37]/50 bg-amber-50/30' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex items-center justify-between w-full p-4 sm:p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-800 pr-8">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-4 sm:p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
}
