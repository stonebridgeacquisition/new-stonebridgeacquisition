"use client";

import dynamic from "next/dynamic";

// Dynamically import the WelcomePopup with no SSR since it uses localStorage
const WelcomePopupNoSSR = dynamic(
  () => import("@/components/welcome-popup").then(mod => ({ default: mod.WelcomePopup })),
  { ssr: false }
);

export function WelcomePopupWrapper() {
  return <WelcomePopupNoSSR />;
} 