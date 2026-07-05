"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Loader2, Sparkles, Mail, User, Phone } from "lucide-react";
import { apiPost } from "@/lib/apiClient";

export function ParticipationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const d = new Date();
      const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        date: today,
        type: "ALTERNATE",
        durationSeconds: 0
      };
      
      const res = await apiPost<any>("/users/home/submit-attempt", payload);
      
      if (res.success) {
        toast.success("Successfully entered the draw! Good luck!");
        setFormData({ name: "", email: "", phone: "" });
        localStorage.setItem("cw_submitted_today", today);
        window.dispatchEvent(new Event("puzzle-submitted"));
      } else {
        toast.error(res.message || "Failed to submit entry. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Card className="w-full h-full border-slate-200 shadow-sm relative overflow-hidden bg-white">
      <div className="absolute top-[-50px] right-[-50px] opacity-[0.03] pointer-events-none">
        <Sparkles className="w-64 h-64 text-slate-900" />
      </div>
      
      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-800">
          <Sparkles className="h-6 w-6 text-[#D4AF37]" />
          Alternative Entry
        </CardTitle>
        <CardDescription className="text-sm font-medium text-slate-500">
          Can't solve the puzzle today? No worries! Enter your details below to participate in today's prize draw.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">
              Phone Number <span className="text-slate-400 font-normal lowercase tracking-normal">(optional)</span>
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                placeholder="+1 (234) 567-8900" 
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold h-12 rounded-xl shadow-md transition-all active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Send className="w-5 h-5 mr-2" />
            )}
            {isSubmitting ? "Submitting..." : "Participate Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
