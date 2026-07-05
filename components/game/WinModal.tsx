"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, X, User, Mail, Phone, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { apiPost } from "@/lib/apiClient";
import { toast } from "sonner";

type WinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  time?: string;
  seconds?: number;
};

export function WinModal({ isOpen, onClose, time, seconds = 0 }: WinModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      // Generate particles for a sparkling fireworks explosion (jikmik baji)
      // Spawning multiple explosions or a huge one so it goes all around the modal
      setParticles(Array.from({ length: 150 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        // Massive velocity so they shoot past the modal
        const velocity = Math.random() * 800 + 200; 
        return {
          id: i,
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
          color: ['bg-yellow-300', 'bg-white', 'bg-amber-400', 'bg-yellow-100'][Math.floor(Math.random() * 4)],
          delay: Math.random() * 0.2, // Quick explosion
          size: Math.random() * 4 + 2, // 2px to 6px (small sparks)
          duration: Math.random() * 1.5 + 2 // 2s to 3.5s hang time
        };
      }));
    }
  }, [isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        date: today,
        type: "PUZZLE",
        durationSeconds: seconds
      };
      
      const res = await apiPost("/users/home/submit-attempt", payload);
      
      if (res.success) {
        setSubmitted(true);
        localStorage.setItem("cw_submitted_today", today);
        window.dispatchEvent(new Event("puzzle-submitted"));
      } else {
        toast.error(res.message || "Failed to submit. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-slate-900/40"
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            
            {/* Sparkling Fireworks Explosion */}
            {!submitted && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[110]">
                {particles.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.4, 1, 0.2, 0], // Twinkling / Jikmik
                      scale: [0, 1.2, 0.8, 1, 0],
                      x: p.x, 
                      y: p.y + (Math.random() * 200 + 50), // Gravity pulls them down
                    }}
                    transition={{ 
                      duration: p.duration, 
                      delay: p.delay, 
                      ease: [0.25, 1, 0.5, 1] // fast pop, slow fall
                    }}
                    className={`absolute rounded-full ${p.color} shadow-[0_0_12px_3px_rgba(253,224,71,0.9)]`}
                    style={{ width: p.size, height: p.size }}
                  />
                ))}
              </div>
            )}

            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 40, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-[0_0_50px_-12px_rgba(212,175,55,0.4)] max-w-md w-full pointer-events-auto relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-[#F59E0B] to-primary z-20"></div>

              <div className="p-8 w-full h-full relative">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-20 group"
                >
                  <X className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </button>

                {!submitted ? (
                  <div className="relative z-10">
                    <div className="text-center space-y-5">
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2, bounce: 0.6 }}
                        className="mx-auto w-20 h-20 bg-gradient-to-br from-[#FFE87C] to-[#D4AF37] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-yellow-500/30 border border-yellow-300 relative"
                      >
                        <motion.div
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                          <Trophy className="w-10 h-10 text-white drop-shadow-md" />
                        </motion.div>
                        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-pulse" />
                      </motion.div>
                      
                      <div>
                        <motion.h2 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl font-black mb-2 text-slate-900"
                        >
                          Congratulations!
                        </motion.h2>
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-slate-600 text-[15px]"
                        >
                          Puzzle solved in <span className="font-extrabold text-slate-900">{time || "00:00"}</span>!
                        </motion.p>
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-slate-500 text-sm mt-2"
                        >
                          Enter below to claim your daily prize.
                        </motion.p>
                      </div>
                      
                      <motion.form 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        onSubmit={handleSubmit} 
                        className="space-y-4 text-left pt-2"
                      >
                        <div className="space-y-1.5 relative group">
                          <Label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="h-12 pl-10 bg-white border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-xl transition-all font-medium placeholder:font-normal" />
                          </div>
                        </div>
                        <div className="space-y-1.5 relative group">
                          <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                            <Input id="email" name="email" value={formData.email} onChange={handleChange} type="email" required placeholder="john@example.com" className="h-12 pl-10 bg-white border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-xl transition-all font-medium placeholder:font-normal" />
                          </div>
                        </div>
                        <div className="space-y-1.5 relative group">
                          <Label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number <span className="text-slate-400 font-normal capitalize">(Optional)</span></Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" />
                            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000" className="h-12 pl-10 bg-white border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-xl transition-all font-medium placeholder:font-normal" />
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-12 text-base font-bold mt-2 bg-gradient-to-r from-[#D4AF37] to-[#e5c04b] hover:from-[#c5a030] hover:to-[#d4af37] text-white shadow-xl shadow-yellow-500/25 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          ) : null}
                          {isSubmitting ? "Submitting..." : "Submit Entry"}
                        </Button>
                      </motion.form>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-10 relative z-10"
                  >
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-500/30 border-4 border-green-100">
                      <motion.div 
                        initial={{ scale: 0, rotate: -45 }} 
                        animate={{ scale: 1, rotate: 0 }} 
                        transition={{ type: "spring", delay: 0.2, bounce: 0.6 }}
                      >
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 mb-3">Entry Submitted!</h2>
                      <p className="text-slate-600 text-[15px] leading-relaxed">Thank you for playing. <br/> Keep an eye on your email for the daily prize announcement!</p>
                    </div>
                    <Button 
                      onClick={onClose} 
                      className="w-full h-12 text-base font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl mt-4 shadow-lg"
                    >
                      Back to Home
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
