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
import { UserPlus } from "lucide-react";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Account created successfully!");
      setIsLoading(false);
      router.push("/login");
    }, 1000);
  }

  return (
    <div className="w-full space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-[#1F2937]">Create an account</h2>
        <p className="text-muted-foreground">Join the daily crossword giveaway platform</p>
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
    </div>
  );
}
