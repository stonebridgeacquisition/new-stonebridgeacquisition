"use client";

import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-maroon-50 border-t border-maroon-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col items-start mb-4">
              <div className="relative h-32 w-32 mb-4">
                <Image 
                  src="/images/Bridgelogo.png" 
                  alt="Stonebridge Acquisition Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-maroon-700 text-sm">
                We help businesses leverage AI to automate operations, 
                boost efficiency, and scale faster with smart solutions.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-maroon-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-maroon-700 hover:text-maroon-900 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-maroon-700 hover:text-maroon-900 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/audit-survey" className="text-maroon-700 hover:text-maroon-900 transition-colors text-sm">
                  Free AI Audit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-maroon-700 hover:text-maroon-900 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="font-semibold text-maroon-900 mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-maroon-700 text-sm">AI Business Automation</li>
              <li className="text-maroon-700 text-sm">CRM Integration</li>
              <li className="text-maroon-700 text-sm">Lead Generation</li>
              <li className="text-maroon-700 text-sm">Process Optimization</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-semibold text-maroon-900 mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-maroon-800 mr-2 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:info@stonebridgeacquisition.com" 
                  className="text-maroon-700 hover:text-maroon-900 transition-colors text-sm"
                >
                  info@stonebridgeacquisition.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-maroon-800 mr-2 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <a 
                    href="tel:+971552377398" 
                    className="text-maroon-700 hover:text-maroon-900 transition-colors text-sm"
                  >
                    +971 55 237 7398 (UAE)
                  </a>
                  <a 
                    href="tel:+2349163670000" 
                    className="text-maroon-700 hover:text-maroon-900 transition-colors text-sm"
                  >
                    +234 916 367 0000 (Nigeria)
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Instagram className="h-5 w-5 text-maroon-800 mr-2 flex-shrink-0" />
                <a 
                  href="https://instagram.com/stonebridgeacquisition" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-maroon-700 hover:text-maroon-900 transition-colors text-sm"
                >
                  @stonebridgeacquisition
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-maroon-100 mt-10 pt-6 text-center">
          <p className="text-maroon-700 text-sm">
            &copy; {currentYear} Stonebridge Acquisition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 