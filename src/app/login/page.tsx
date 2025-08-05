
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircuitBoard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('2fa');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-background dark:bg-[linear-gradient(to_right,hsl(var(--foreground)_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)_/_0.1)_1px,transparent_1px)]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)_/_0.15),transparent)]"></div></div>
      <Card className="w-full max-w-sm border-primary/20 shadow-lg shadow-primary/10 bg-card/80 backdrop-blur-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <CircuitBoard className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl text-primary">TechShop Manager</CardTitle>
           <CardDescription>
            {step === 'credentials' 
              ? "Enter your credentials to access your dashboard"
              : "Enter the code from your authenticator app"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'credentials' ? (
             <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="employee@techshop.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                  Login
                </Button>
              </div>
            </form>
          ) : (
            <form className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="2fa-code">6-Digit Code</Label>
                <Input id="2fa-code" type="text" inputMode="numeric" maxLength={6} placeholder="123456" required />
              </div>
               <Link href="/dashboard" className="block w-full pt-2">
                <Button type="submit" className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                   <ShieldCheck className="mr-2 h-4 w-4"/>
                  Verify
                </Button>
              </Link>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
