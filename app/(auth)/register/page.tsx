"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserPlus, CheckCircle2, RefreshCw } from "lucide-react";
import { apiPost } from "@/lib/apiClient";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 characters."),
});

type Step = "register" | "otp";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("register");
  const [isLoading, setIsLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    
    try {
      const response = await apiPost<{ success: boolean; message: string; data?: any }>("/auth/signup", {
        fullname: values.fullName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      toast.success(response.message || "Account created successfully! Please verify your email.");
      setSavedEmail(values.email);
      setStep("otp");
      setTimeLeft(120);
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    try {
      // Using generic endpoints for verification. These may need to be adjusted if the backend is different.
      const response = await apiPost<{ success: boolean; message: string }>("/auth/verify-otp", {
        email: savedEmail,
        otp: values.otp,
      });

      toast.success(response.message || "Email verified successfully! You can now log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to verify OTP.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOtp() {
    setIsLoading(true);
    try {
      // Using generic endpoint for resend. May need adjustment.
      const response = await apiPost<{ success: boolean; message: string }>("/auth/send-otp", {
        email: savedEmail,
      });
      toast.success(response.message || "OTP resent successfully!");
      setTimeLeft(120); // Reset timer
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full space-y-8">
      {step === "register" && (
        <>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#1F2937]">Create an account</h2>
            <p className="text-muted-foreground">Join the Heritage Stackers Daily Mini Crossword.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-secondary">Full Name</Label>
              <Input 
                id="fullName" 
                placeholder="John Doe" 
                className="h-11 bg-primary/5 border-primary/30 focus-visible:ring-primary/50 transition-colors"
                disabled={isLoading}
                {...register("fullName")} 
              />
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-secondary">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="h-11 bg-primary/5 border-primary/30 focus-visible:ring-primary/50 transition-colors"
                disabled={isLoading}
                {...register("email")} 
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-secondary">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="h-11 bg-primary/5 border-primary/30 focus-visible:ring-primary/50 transition-colors"
                  disabled={isLoading}
                  {...register("password")} 
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-secondary">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••"
                  className="h-11 bg-primary/5 border-primary/30 focus-visible:ring-primary/50 transition-colors"
                  disabled={isLoading}
                  {...register("confirmPassword")} 
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all text-white" disabled={isLoading}>
              {isLoading ? "Creating account..." : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" /> Register
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border/40">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:text-accent transition-colors">
              Sign in
            </Link>
          </div>
        </>
      )}

      {step === "otp" && (
        <>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#1F2937]">Verify Email</h2>
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
            
            <div className="flex items-center justify-between text-sm mt-4">
              <span className="text-muted-foreground">
                Time remaining: <span className="font-medium text-[#1F2937]">{formatTime(timeLeft)}</span>
              </span>
              <Button
                type="button"
                variant="ghost"
                className="h-auto p-0 text-primary font-bold hover:text-accent hover:bg-transparent"
                disabled={timeLeft > 0 || isLoading}
                onClick={handleResendOtp}
              >
                <RefreshCw className="mr-1 h-4 w-4" /> Resend OTP
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
