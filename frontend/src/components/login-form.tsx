import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  link?: string;
  linkHead?: string;
  linkText?: string;
  BtnText?: string;
  onLogin?: (email: string, password: string) => void;
}

export function LoginForm({
  className,
  title = "Login to your account",
  description = "Enter your email below to login to your account",
  link = "#",
  linkHead = "Don't have an account ?",
  linkText = "Sign up",
  BtnText = "Login",
  onLogin,
  ...props
}: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;
    if (onLogin) onLogin(email, password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {BtnText}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {linkHead}{" "}
              <a href={link} className="underline underline-offset-4">
                {linkText}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
