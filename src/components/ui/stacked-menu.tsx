"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface MenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  showChevron?: boolean
}

export function Menu({ trigger, children, align = "left", showChevron = true }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true&quot;
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown className="ml-2 -mr-1 h-4 w-4 text-maroon-500" aria-hidden="true" />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-maroon-200 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  href?: string
  label?: string
}

export function MenuItem({ children, onClick, disabled = false, icon, isActive = false, href, label }: MenuItemProps) {
  const handleClick = () => {
    if (href) {
      window.location.href = href;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`relative block w-full h-12 text-center group
        ${disabled ? "text-gray-400 cursor-not-allowed" : "text-maroon-900"}
        ${isActive ? "bg-maroon-50" : ""}
        transition-all duration-200 hover:scale-105
      `}
      role="menuitem"
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
      data-href={href}
      data-label={label}
    >
      <span className="flex items-center justify-center h-full">
        {icon && (
          <span className="h-5 w-5 transition-all duration-200 group-hover:[&_svg]:stroke-[2.5]">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  )
}

// Helper function to get navigation labels based on paths
const getNavLabel = (path: string): string => {
  switch(path) {
    case '/': return 'Home';
    case '/audit-survey': return 'Free AI Audit';
    case '/about': return 'About';
    case '/contact': return 'Contact';
    default: return '';
  }
};

export function MenuContainer({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = React.Children.toArray(children)
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isExpanded && !target.closest('.stacked-menu')) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click&#39;, handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="relative w-[48px] stacked-menu z-50" data-expanded={isExpanded}>
      {/* Container for all items */}
      <div className="relative">
        {/* First item - always visible */}
        <div 
          className="relative w-12 h-12 bg-white shadow-xl hover:shadow-lg cursor-pointer rounded-full group will-change-transform z-50 transition-all duration-200 hover:scale-105 border border-maroon-100/30"
          onClick={handleToggle}
        >
          {childrenArray[0]}
        </div>

        {/* Other items */}
        {childrenArray.slice(1).map((child, index) => (
          <div 
            key={index} 
            className="absolute top-0 left-0 w-12 h-12 bg-white shadow-lg hover:shadow-xl will-change-transform rounded-full overflow-hidden border border-maroon-100/30"
            style={{
              transform: `translateY(${isExpanded ? (index + 1) * 60 : 0}px)`,
              opacity: isExpanded ? 1 : 0,
              zIndex: 40 - index,
              transition: `transform ${isExpanded ? '300ms' : '200ms'} cubic-bezier(0.4, 0, 0.2, 1),
                         opacity ${isExpanded ? '300ms' : '250ms'}, 
                         box-shadow 200ms ease`,
              backfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            {child}
          </div>
        ))}
      </div>
      
      {/* Fixed Labels */}
      {isExpanded && (
        <div className="absolute top-0 right-full mr-3 text-right space-y-[38px] mt-[60px] transition-opacity duration-300 opacity-0 animate-fadeIn">
          <div className="flex items-center justify-end">
            <div className="py-1 px-3 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-md whitespace-nowrap text-maroon-800 border border-maroon-100/30">
              Home
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="py-1 px-3 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-md whitespace-nowrap text-maroon-800 border border-maroon-100/30">
              Free AI Audit
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="py-1 px-3 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-md whitespace-nowrap text-maroon-800 border border-maroon-100/30">
              About
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="py-1 px-3 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm shadow-md whitespace-nowrap text-maroon-800 border border-maroon-100/30">
              Contact
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 