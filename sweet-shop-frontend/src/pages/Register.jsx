import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show specific error message from backend
        throw new Error(data.error || "Registration failed");
      }

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <Card className="w-[360px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Register</CardTitle>
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
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>

          <p className="text-sm text-center text-neutral-500 mt-4">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-neutral-900 underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}