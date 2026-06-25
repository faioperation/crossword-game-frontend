"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Send, CheckCircle2, ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Schemas for each step
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 characters."),
});

const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type Step = "email" | "otp" | "password";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");

  // Forms
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  // Submit Handlers
  async function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      setSavedEmail(values.email);
      setIsLoading(false);
      setStep("otp");
      toast.success("OTP sent to your email!");
    }, 1200);
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Verified OTP:", values.otp);
      setIsLoading(false);
      setStep("password");
      toast.success("OTP verified successfully!");
    }, 1200);
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      console.log("New password set for:", savedEmail);
      setIsLoading(false);
      toast.success("Password reset successfully! Please login with your new password.");
      router.push("/login");
    }, 1500);
  }

  return (
    <div className="w-full space-y-8">
      
      {/* STEP 1: EMAIL */}
      {step === "email" && (
        <>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#1F2937]">Reset Password</h2>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a 6-digit OTP to verify your identity.
            </p>
          </div>

          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-secondary">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="h-11 bg-primary/5 border-primary/30 focus-visible:ring-primary/50 transition-colors"
                disabled={isLoading}
                {...emailForm.register("email")} 
              />
              {emailForm.formState.errors.email && (
                <p className="text-sm text-destructive">{emailForm.formState.errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all text-white" disabled={isLoading}>
              {isLoading ? "Sending OTP..." : (
                <>
                  <Send className="mr-2 h-5 w-5" /> Send OTP
                </>
              )}
            </Button>
          </form>
        </>
      )}

      {/* STEP 2: OTP */}
      {step === "otp" && (
        <>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#1F2937]">Enter OTP</h2>
            <p className="text-muted-foreground">
              We've sent a 6-digit verification code to <span className="font-semibold text-primary">{savedEmail}</span>.
            </p>
          </div>

          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-secondary">Verification Code</Label>
              <Input 
                id="otp" 
                type="text" 
                placeholder="Enter 6-digit code" 
                className="h-11 text-center tracking-widest text-lg font-bold bg-primary/5 border-primary/30 focus-visible:ring-primary/50 transition-colors"
                maxLength={6}
                disabled={isLoading}
                {...otpForm.register("otp")} 
              />
              {otpForm.formState.errors.otp && (
                <p className="text-sm text-destructive">{otpForm.formState.errors.otp.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all text-white" disabled={isLoading}>
              {isLoading ? "Verifying..." : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" /> Verify OTP
                </>
              )}
            </Button>
          </form>
        </>
      )}

      {/* STEP 3: NEW PASSWORD */}
      {step === "password" && (
        <>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#1F2937]">Create New Password</h2>
            <p className="text-muted-foreground">
              Your identity has been verified. Please enter a strong new password.
            </p>
          </div>

          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-secondary">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                placeholder="••••••••" 
                className="h-11 bg-primary/5 border-primary/30 focus-visible:ring-primary/50 transition-colors"
                disabled={isLoading}
                {...passwordForm.register("password")} 
              />
              {passwordForm.formState.errors.password && (
                <p className="text-sm text-destructive">{passwordForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-secondary">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="••••••••" 
                className="h-11 bg-primary/5 border-primary/30 focus-visible:ring-primary/50 transition-colors"
                disabled={isLoading}
                {...passwordForm.register("confirmPassword")} 
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all text-white" disabled={isLoading}>
              {isLoading ? "Resetting..." : (
                <>
                  <Lock className="mr-2 h-5 w-5" /> Reset Password
                </>
              )}
            </Button>
          </form>
        </>
      )}

      <div className="pt-4 border-t border-border/40 text-center md:text-left">
        <Link href="/login" className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
}
