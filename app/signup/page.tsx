"use client";

import { AuthForm } from "@/lib/features/auth/auth-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      // First register the user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.email.split("@")[0], // Simple name from email
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
      }

      toast({
        title: "Success",
        description: "Account created successfully",
      });

      // Then sign in the user
      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInResult?.error) {
        console.warn("Sign-in after registration failed", signInResult.error);
        // Just redirect to login page if auto-login fails
        router.push("/login");
        return;
      }

      // Registration and login successful, redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("Signup error:", error);

      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm type="signup" onSubmit={handleSignup} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}
