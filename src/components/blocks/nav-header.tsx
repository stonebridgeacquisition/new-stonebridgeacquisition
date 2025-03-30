"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, Home, FileText, User, Mail } from "lucide-react";
import { MenuContainer, MenuItem } from "@/components/ui/stacked-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavHeaderProps {
  className?: string;
}

export function NavHeader({ className }: NavHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "flex justify-between items-center w-full",
        scrolled && "bg-white/90 backdrop-blur-sm shadow-sm",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      {/* Logo */}
      <div className="relative">
        <Link href="/" className="flex items-center">
          <div className="relative h-40 w-40 mr-0">
            <Image 
              src="/images/SBLogo2.png" 
              alt="Stonebridge Acquisition Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>
      
      {/* Empty space to ensure logo is left-aligned */}
      <div className="flex-1"></div>

      {/* Fixed Mobile Menu - Always visible in top right */}
      <div className="fixed top-3 right-3 z-50">
        <div className={`p-1.5 rounded-full ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md border border-maroon-100/30' : ''} transition-all duration-300`}>
          <MenuContainer>
            <MenuItem icon={<MenuIcon size={20} strokeWidth={2} className="text-maroon-800" />} label="Menu" />
            <MenuItem
              icon={<Home size={20} strokeWidth={2} className={`${pathname === "/" ? "text-maroon-700" : "text-maroon-500"}`} />}
              href="/"
              isActive={pathname === "/"}
              label="Home"
            />
            <MenuItem
              icon={<FileText size={20} strokeWidth={2} className={`${pathname === "/audit-survey" ? "text-maroon-700" : "text-maroon-500"}`} />}
              href="/audit-survey"
              isActive={pathname === "/audit-survey"}
              label="Free AI Audit"
            />
            <MenuItem
              icon={<User size={20} strokeWidth={2} className={`${pathname === "/about" ? "text-maroon-700" : "text-maroon-500"}`} />}
              href="/about"
              isActive={pathname === "/about"}
              label="About"
            />
            <MenuItem
              icon={<Mail size={20} strokeWidth={2} className={`${pathname === "/contact" ? "text-maroon-700" : "text-maroon-500"}`} />}
              href="/contact"
              isActive={pathname === "/contact"}
              label="Contact"
            />
          </MenuContainer>
        </div>
      </div>
    </div>
  );
} 