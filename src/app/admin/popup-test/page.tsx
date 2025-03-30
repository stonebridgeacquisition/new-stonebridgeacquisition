"use client";

import { WelcomePopupReset } from "@/components/welcome-popup-reset";
import Link from "next/link";

export default function PopupTestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-maroon-900">Welcome Popup Test Page</h1>
      
      <div className="prose max-w-none">
        <p>This page allows you to test the welcome popup functionality.</p>
        <ul>
          <li>The welcome popup appears when a user first visits the site</li>
          <li>It collects the user&#39;s name and email</li>
          <li>Data is sent to your Make.com webhook</li>
          <li>If a user skips the popup, it will reappear after 1 minute</li>
          <li>If a user completes the form, the popup won&#39;t appear again</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Testing Instructions</h2>
        <ol>
          <li>Click the "Reset Welcome Popup&quot; button in the bottom right corner</li>
          <li>The page will reload and the popup should appear</li>
          <li>Test the "Skip for now&quot; button - wait 1 minute and the popup should reappear</li>
          <li>Test the form submission - after submitting, the popup should not reappear even after waiting</li>
        </ol>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">How It Works</h2>
        <p>The popup uses localStorage to track different states:</p>
        <ul>
          <li><code>welcomePopupStatus</code>: Can be "skipped" or "completed&quot;</li>
          <li><code>welcomePopupLastTime</code>: Timestamp of when the popup was last shown</li>
          <li><code>hasSeenWelcomePopup</code>: Legacy flag for backward compatibility</li>
        </ul>
        <p>When a user skips the popup, it will reappear after 1 minute. If they complete the form, it won&#39;t appear again.</p>
        
        <div className="mt-8">
          <Link href="/" className="text-maroon-700 hover:text-maroon-900 underline">
            Return to Home
          </Link>
        </div>
      </div>
      
      <WelcomePopupReset />
    </div>
  );
} 