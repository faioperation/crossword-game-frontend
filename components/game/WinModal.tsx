"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, X } from "lucide-react";
import { useState } from "react";

type WinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  time?: string;
};

export function WinModal({ isOpen, onClose, time }: WinModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full pointer-events-auto relative overflow-hidden"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>

              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-[#F59E0B] to-primary"></div>

              {!submitted ? (
                <div className="text-center space-y-6 mt-2">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Trophy className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Congratulations!</h2>
                    <p className="text-slate-600 mb-2">You've successfully solved today's puzzle in <span className="font-bold text-slate-900">{time || "00:00"}</span>!</p>
                    <p className="text-slate-600 text-sm">Enter your details below for a chance to win the daily prize.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 text-left pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required placeholder="John Doe" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required placeholder="john@example.com" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-12" />
                    </div>
                    <Button type="submit" className="w-full h-12 text-lg font-bold mt-2">
                      Submit Entry
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="text-center space-y-6 py-8">
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Entry Submitted!</h2>
                    <p className="text-slate-600">Thank you for playing. Winners are announced daily, keep an eye on your email!</p>
                  </div>
                  <Button onClick={onClose} variant="outline" className="w-full h-12">
                    Close
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
