"use client";

import { Button } from "@/components/ui/button";

export function WelcomePopupReset() {
  const resetPopup = () => {
    // Clear all popup-related localStorage items
    localStorage.removeItem("hasSeenWelcomePopup");
    localStorage.removeItem("welcomePopupStatus");
    localStorage.removeItem("welcomePopupLastTime");
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={resetPopup}
        className="bg-white/80 text-xs text-maroon-800 border-maroon-200 hover:bg-maroon-100"
      >
        Reset Welcome Popup
      </Button>
    </div>
  );
} 