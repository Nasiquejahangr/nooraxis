"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Phone, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBar() {
  const [offer, setOffer] = useState<{
    text: string;
    buttonText: string;
    buttonLink: string;
    isActive: boolean;
  } | null>(null);
  
  const [isDismissed, setIsDismissed] = useState(false); // default false, updated via sessionStorage in useEffect
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fetch the offer data from the API
  useEffect(() => {
    async function fetchOffer() {
      try {
        const res = await fetch("/api/offers");
        if (res.ok) {
          const data = await res.json();
          setOffer(data);
          
          // Check if user dismissed it in this session
          const dismissed = sessionStorage.getItem("nooraxis_announcement_dismissed") === "true";
          setIsDismissed(dismissed);
        }
      } catch (err) {
        console.error("Failed to load top announcement:", err);
      }
    }
    fetchOffer();
  }, []);

  // Update layout height variable on change
  useEffect(() => {
    const updateHeight = () => {
      const showBanner = offer?.isActive && !isDismissed && !pathname?.startsWith("/admin");
      if (showBanner && containerRef.current) {
        const height = containerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--announcement-height", `${height}px`);
      } else {
        document.documentElement.style.setProperty("--announcement-height", "0px");
      }
    };

    updateHeight();
    
    // Listen for resize to update padding offset dynamically
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [offer, isDismissed, pathname]);

  // Hide completely on the Admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Do not render if inactive, loaded data is missing, or dismissed
  if (!offer || !offer.isActive || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("nooraxis_announcement_dismissed", "true");
    document.documentElement.style.setProperty("--announcement-height", "0px");
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-r from-blue-950 via-[#102a75] to-indigo-950 text-white border-b border-blue-500/30 shadow-[0_4px_25px_rgba(37,99,235,0.45)] fixed top-0 left-0 right-0 z-[60] py-2.5 px-4 sm:px-8 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pr-6 text-center">
        {/* Dynamic Offer Text with pulsing glowing stars */}
        <div className="flex items-center justify-center flex-wrap gap-1 text-xs md:text-sm font-medium tracking-wide">
          <Star size={12} className="text-cyan-400 fill-cyan-400 animate-pulse shrink-0 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
          <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{offer.text}</span>
          <Star size={12} className="text-cyan-400 fill-cyan-400 animate-pulse shrink-0 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
        </div>

        {/* CTA Button */}
        {offer.buttonText && (
          <motion.a
            href={offer.buttonLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff5a00] to-[#ff7300] hover:from-[#e04f00] hover:to-[#e06500] text-white text-xs font-bold transition-all shadow-[0_2px_15px_rgba(255,90,0,0.5)] shrink-0"
          >
            {offer.buttonLink.startsWith("tel:") && <Phone size={12} />}
            <span>{offer.buttonText}</span>
          </motion.a>
        )}
      </div>

      {/* Dismiss Icon */}
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        aria-label="Dismiss Announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
