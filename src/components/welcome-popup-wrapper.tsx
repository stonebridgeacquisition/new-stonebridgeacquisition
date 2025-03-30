"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Dynamically import the WelcomePopup with no SSR since it uses localStorage
const WelcomePopupNoSSR = dynamic(
  () => import("@/components/welcome-popup").then(mod => ({ default: mod.WelcomePopup })),
  { ssr: false }
);

export function WelcomePopupWrapper() {
  const pathname = usePathname();
  
  // Only show the popup on the home page
  if (pathname !== '/') {
    return null;
  }
  
  return <WelcomePopupNoSSR />;
} 