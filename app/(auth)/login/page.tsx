"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Logged in successfully!");
      setIsLoading(false);
      router.push("/");
    }, 1000);
  }

  return (
    <div className="w-full space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-[#1F2937]">Welcome back</h2>
        <p className="text-muted-foreground">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-secondary">Password</Label>
            <Link href="#" className="text-sm text-accent font-semibold hover:underline" tabIndex={-1}>
              Forgot password?
            </Link>
          </div>
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

        <Button type="submit" className="w-full h-12 text-base font-bold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all text-white" disabled={isLoading}>
          {isLoading ? "Signing in..." : (
            <>
              <LogIn className="mr-2 h-5 w-5" /> Sign In
            </>
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border/40">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary font-bold hover:text-accent transition-colors">
          Register here
        </Link>
      </div>
    </div>
  );
}
