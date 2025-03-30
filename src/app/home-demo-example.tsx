"use client";

import { HomeDemo } from "@/components/blocks/home-demo";

export default function HomeExample() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* This is the new header with NavHeader */}
      <HomeDemo />
      
      {/* Rest of your page content would go here */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Main Content</h2>
        <p>This is where the rest of your page content would go.</p>
      </div>
    </div>
  );
} 