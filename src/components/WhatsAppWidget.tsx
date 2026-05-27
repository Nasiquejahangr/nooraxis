"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhatsAppWidget() {
  const pathname = usePathname();
  
  // Hide the WhatsApp widget on the Admin section
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <Link
      href="https://wa.me/919508904653"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-fade-in"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </Link>
  );
}
