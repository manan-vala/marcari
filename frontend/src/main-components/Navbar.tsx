import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../components/ModeToggle";
import { Plus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white shadow-sm dark:bg-[var(--background)] dark:border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <a
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          MyBrand
        </a>

        {/* Middle: Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search…"
              className="pl-4 pr-10 rounded-full dark:bg-gray-800 dark:text-white"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
              />
            </svg>
          </div>
        </div>

        {/* Right: Auth + Theme Toggle */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link to="/user/login">
            <Button
              variant="outline"
              className="rounded-full px-4 dark:border-gray-700"
            >
              Login
            </Button>
          </Link>
          <Link to="/user/register">
            <Button className="rounded-full px-4">Sign Up</Button>
          </Link>
        </div>

        <Link to="/products/new" className="mx-4">
          <Button>
            <Plus />
          </Button>
        </Link>
      </div>
    </header>
  );
}
