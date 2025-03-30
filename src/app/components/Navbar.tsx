"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-maroon-100 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-maroon-900">
            Stonebridge Acquisition
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-maroon-700 hover:text-maroon-900">
              Home
            </Link>
            <Link href="/about" className="text-maroon-700 hover:text-maroon-900">
              About
            </Link>
            <Link href="/audit-survey" className="text-maroon-700 hover:text-maroon-900">
              Free Audit
            </Link>
            <Link href="/contact" className="text-maroon-700 hover:text-maroon-900">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:inline-flex"
            >
              {theme === "dark&quot; ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </Button>

            <Link href="/audit-survey">
              <Button className="hidden md:inline-flex bg-maroon-800 hover:bg-maroon-900 text-white">
                Get Free AI Audit
              </Button>
            </Link>

            <button className="md:hidden">
              <svg
                className="h-6 w-6 text-maroon-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 