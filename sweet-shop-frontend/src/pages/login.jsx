import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // login logic later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      <Card className="w-[360px] shadow-lg border border-neutral-200/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Sweet Shop
          </CardTitle>
          <p className="text-sm text-neutral-500">
            Sign in to manage inventory
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
             type="submit"
             className="w-full bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 active:scale-[0.98]"
            >
              Sign in
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}