"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Sparkles, HelpCircle } from "lucide-react";
import Link from "next/link";
import Interactive3DTexture from "@/components/Interactive3DTexture";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Engineering", "Operations", "Billing"];

  const faqs = [
    { 
      question: "What is your typical process for developing a website or application?", 
      answer: "Our workflow is structured into 4 key phases: 1. Architecture & Strategy (mapping database schemas, routing paths, and server structures), 2. High-Fidelity UI Prototyping, 3. Agile Software Engineering (clean, responsive, verified code), and 4. Continuous SLA Support. We use git systems and staging servers to guarantee complete visibility.",
      category: "Operations"
    },
    { 
      question: "How long does it take to build a custom software solution?", 
      answer: "A bespoke corporate portal or CMS system typical spans 4-6 weeks of engineering. Complex database applications, SaaS platforms, or customized API integrations generally require 2-4 months depending on overall state validation parameters. We align exact timelines in the initial architectural sessions.",
      category: "Engineering"
    },
    { 
      question: "Do you provide ongoing maintenance and support after launch?", 
      answer: "Yes, we engineer with the future in mind. We provide active SLA Maintenance packages including database recovery backups, security audits, page-speed tuning, and regular server health monitoring to guarantee persistent uptime and zero platform decay.",
      category: "Operations"
    },
    { 
      question: "What technology stack do you specialize in?", 
      answer: "Our core web products are engineered using React, Next.js, and TypeScript, styled dynamically with custom Tailwind and vanilla CSS. Backend APIs utilize Node.js, Express, and secure Mongoose Mapped databases. Mobile apps utilize Flutter or React Native frameworks to achieve fluid gestural interfaces.",
      category: "Engineering"
    },
    { 
      question: "Can you help improve our existing website's SEO?", 
      answer: "Yes. Our team conducts detailed technical search engine indexing audits, checking Core Web Vitals, parsing semantic HTML tags, optimizing load rendering paths, and mapping keyword vectors to organically scale your digital discoverability and conversion metrics.",
      category: "Engineering"
    },
    { 
      question: "How do you handle project pricing and billing structures?", 
      answer: "We support flexible billing structures matching project scopes. Defined projects utilize Fixed Milestone pricing. Dynamic products utilize a retainer or time-and-materials format. All payment terms and scalable scopes are agreed upon in our transparent, negotiable contracts.",
      category: "Billing"
    }
  ];

  const filteredFaqs = activeCategory === "All"
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const fadeIn = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  } as const;

  return (
    <div className="flex flex-col w-full overflow-hidden tech-grid min-h-screen">
      {/* Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-6 md:pt-12 pb-20 px-6 overflow-hidden">
        {/* Interactive 3D Mesh Particle Grid */}
        <Interactive3DTexture />

        {/* Subtle mesh background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-brand-accent/10 dark:bg-brand-accent/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-brand-blue/5 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-accent mb-6 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={13} className="text-brand-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase">Information Hub</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Find technical responses, operational workflows, and billing details structured by our engineering team.
          </motion.p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="pb-8 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 bg-slate-100/50 dark:bg-[#03050c]/50 p-1.5 rounded-full border border-gray-200 dark:border-white/5 max-w-md mx-auto backdrop-blur-md shadow-sm">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null); // Reset open accordion on category switch
                  }}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider focus:outline-none cursor-pointer ${
                    isActive ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="faq-underline"
                      className="absolute inset-0 bg-brand-blue rounded-full shadow-[0_4px_12px_rgba(37,99,235,0.25)] z-0"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div 
                    key={faq.question} 
                    layout
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white/60 dark:bg-[#03050c]/40 backdrop-blur-md ${
                      isOpen 
                        ? "border-brand-accent/50 dark:border-brand-accent/30 shadow-[0_4px_20px_rgba(37,99,235,0.05)]" 
                        : "border-gray-200 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-white/10"
                    }`}
                  >
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : index)} 
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    >
                      <span className={`font-bold text-base sm:text-lg transition-colors flex items-center gap-3 ${
                        isOpen ? "text-brand-blue dark:text-brand-accent" : "text-gray-900 dark:text-white"
                      }`}>
                        <HelpCircle size={18} className="shrink-0 opacity-40 text-brand-blue dark:text-brand-accent" />
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`shrink-0 transition-transform duration-350 ${
                          isOpen ? "rotate-180 text-brand-blue dark:text-brand-accent" : "text-gray-400"
                        }`} 
                        size={18} 
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-black/5 dark:border-white/5 pt-4 pl-11">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* SLA Help Call */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="mt-20 p-8 sm:p-10 rounded-3xl border border-brand-blue/30 text-center bg-white/70 dark:bg-[#03050c]/60 backdrop-blur-md relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 dark:bg-brand-blue/15 text-brand-blue flex items-center justify-center mx-auto mb-6 border border-brand-blue/10">
              <MessageCircle size={26} className="animate-pulse" />
            </div>
            <h3 className="text-xl font-heading font-extrabold mb-3 text-gray-900 dark:text-white">Still have system queries?</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Our architects are online. Send a direct enquiry or message us on WhatsApp for rapid guidance on your custom design loops.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex px-8 py-3.5 rounded-xl bg-brand-blue text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-blue/90 transition-colors shadow-lg shadow-brand-blue/10 cursor-pointer"
            >
              Consult with Architects
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
