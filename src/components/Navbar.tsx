"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide the global Navbar on the Admin section
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white dark:bg-black border-slate-200/50 dark:border-white/5 ${isScrolled
          ? "py-3 md:py-4 shadow-sm"
          : "py-5 md:py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center justify-between">
          {/* Logo Section */}
          <div className="w-auto lg:w-56 lg:shrink-0 flex items-center">
            <Link href="/" className="flex items-center z-50 relative group">
              {/* Light Theme Logo */}
              <Image
                src="/logo-light-v2.png"
                alt="Nooraxis Logo"
                width={280}
                height={280}
                priority
                className={`w-auto object-contain transition-all duration-300 relative z-10 origin-left dark:hidden ${
                  isScrolled ? "h-8 md:h-10" : "h-10 md:h-14"
                }`}
              />
              {/* Dark Theme Logo */}
              <Image
                src="/logo-v2.png"
                alt="Nooraxis Logo"
                width={280}
                height={280}
                priority
                className={`w-auto object-contain transition-all duration-300 relative z-10 origin-left hidden dark:block ${
                  isScrolled ? "h-8 md:h-10" : "h-10 md:h-14"
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-grow gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${isActive
                    ? "text-brand-blue dark:text-white font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-[-4px] left-4 right-4 h-[2px] bg-brand-blue dark:bg-white z-0"
                      transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button Section & Theme Toggle */}
          <div className="w-auto lg:w-48 lg:shrink-0 flex justify-end items-center gap-2 md:gap-4">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <div className="hidden lg:block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="px-6 py-2 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-semibold shadow-[0_2px_10px_rgba(37,99,235,0.15)] transition-all flex items-center gap-1 group"
                >
                  <span>Get in Touch</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu & Theme Toggle */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <button
                className="text-slate-900 dark:text-white z-50 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors relative"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay (Dropdown Drawer Extension) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Soft Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            />

            {/* Dropdown Menu (Flush Extension of bottom border) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`fixed ${isScrolled
                ? "top-[61px] md:top-[73px]"
                : "top-[85px] md:top-[101px]"
                } left-0 right-0 bg-white dark:bg-black border-b border-slate-200/50 dark:border-white/5 shadow-lg px-6 py-8 flex flex-col gap-6 z-40 lg:hidden transition-all duration-300`}
            >
              <div className="flex flex-col gap-1 max-w-xl mx-auto w-full">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${isActive
                          ? "text-brand-blue dark:text-white bg-slate-50 dark:bg-white/5 font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          }`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight size={16} className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0 text-brand-blue dark:text-white" : "opacity-0"}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ delay: navLinks.length * 0.03 }}
                className="pt-4 border-t border-slate-100 dark:border-white/5 max-w-xl mx-auto w-full"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white text-center text-sm font-semibold shadow-[0_2px_10px_rgba(37,99,235,0.15)] flex items-center justify-center gap-1 group"
                >
                  <span>Get in Touch</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
