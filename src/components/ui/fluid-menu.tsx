"use client";

import React, { useState, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Create context for the menu state
type MenuContextType = {
  expanded: boolean;
  toggleExpanded: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuContainer({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <MenuContext.Provider value={{ expanded, toggleExpanded }}>
      <div 
        className="relative"
        data-expanded={expanded}
      >
        <div className="flex flex-col items-center gap-3">
          <AnimatePresence>
            {expanded && (
              <motion.div 
                className="flex flex-col-reverse gap-3 items-center"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {React.Children.toArray(children).slice(1).map((child, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -5 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: 0.05 * index, 
                      ease: "easeOut" 
                    }}
                  >
                    {child}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {React.Children.toArray(children)[0]}
        </div>
      </div>
    </MenuContext.Provider>
  );
}

export function MenuItem({ 
  icon, 
  onClick,
  href,
  isToggle = false,
  label
}: { 
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
  isToggle?: boolean;
  label?: string;
}) {
  const context = useContext(MenuContext);
  
  if (!context) {
    throw new Error("MenuItem must be used within a MenuContainer");
  }
  
  const { toggleExpanded, expanded } = context;
  
  const handleClick = () => {
    if (isToggle) {
      toggleExpanded();
    } else if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };
  
  // Different styles for the toggle button vs menu items
  const buttonClasses = isToggle 
    ? "flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 z-10"
    : "flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110&quot;;
  
  return (
    <div className="relative group">
      {label && expanded && !isToggle && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-maroon-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm whitespace-nowrap">
          {label}
        </div>
      )}
      <button
        onClick={handleClick}
        className={buttonClasses}
        aria-label={label || "Menu item"}
      >
        {icon}
      </button>
    </div>
  );
} 