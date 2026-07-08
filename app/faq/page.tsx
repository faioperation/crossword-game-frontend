"use client";

import { PublicLayout } from "@/components/public/PublicLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I play?",
    a: "Every day we publish a new mini crossword puzzle. Simply click on a square to select a clue, and type your answer using your physical or virtual keyboard. Once the grid is full and correct, you'll be prompted to submit your entry.",
  },
  {
    q: "How are winners selected?",
    a: "Winners are selected through a verifiably random draw from all eligible, correct entries submitted on that specific day.",
  },
  {
    q: "Can I play every day?",
    a: "Yes! A brand new puzzle is released every single day at midnight.",
  },
  {
    q: "Do I need an account to play?",
    a: "No account is required to solve the puzzle, but you will need to provide your name and email address when submitting your completed puzzle so we can contact you if you win.",
  },
  {
    q: "Is it free to play?",
    a: "Yes, Heritage Stackers Daily Mini Crossword is 100% free to play and free to enter our giveaways. No purchase is necessary.",
  },
  {
    q: "When are winners announced?",
    a: "Winners are typically announced the following day. They will appear on the 'Previous Winners' page and will be contacted privately via email.",
  },
  {
    q: "How do I claim my prize?",
    a: "If you win, we will send an email to the address you provided during entry. You must reply to that email within 7 days with your shipping details to claim your silver coin.",
  },
  {
    q: "What happens if I miss a day?",
    a: "If you miss a day, you miss that day's giveaway, but you can always return the next day for a new puzzle and a new chance to win!",
  },
  {
    q: "Can I submit multiple entries?",
    a: "No. To keep things fair for everyone, we strictly limit entries to one per person, per email address, per day. Duplicate entries will be disqualified.",
  },
  {
    q: "How is my information used?",
    a: "Your name and email address are used solely for administering the giveaway, contacting winners, and displaying the winner's first name and last initial on our site. We do not sell your personal data.",
  },
  {
    q: "Is there a time limit to solve the puzzle?",
    a: "No, there is no time limit. A timer is provided for your own personal challenge, but how fast you solve the puzzle does not affect your chances of winning.",
  },
  {
    q: "What if I can't solve the puzzle?",
    a: "If you're stuck, you can try again later! You must solve the puzzle correctly to submit an entry via the game.",
  },
  {
    q: "Are the silver coins real?",
    a: "Yes! We give away 100% authentic, high-quality silver pieces. The exact prize may vary day to day but will always be genuine precious metal.",
  },
  {
    q: "I think I found a bug in the game. What should I do?",
    a: "Please reach out to us via the Contact page with a description of the issue. Our technical team will investigate it right away.",
  },
  {
    q: "Can anyone win?",
    a: "Giveaways are open to individuals who are 18 years or older, subject to local laws and regulations where prohibited.",
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
