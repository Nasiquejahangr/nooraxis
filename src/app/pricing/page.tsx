"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Interactive3DTexture from "@/components/Interactive3DTexture";

export default function Pricing() {
  const fadeIn = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  } as const;

  const plans = [
    { 
      name: "Starter", 
      desc: "Ideal for bootstrap start-ups & custom local showcases.", 
      price: "₹24,999", 
      features: ["Custom 5-Page Website Systems", "Mobile Responsive Grid Design", "On-Page Technical SEO Tuning", "Contact Form Database Integration", "1 Month Post-Launch Maintenance Support"], 
      isPopular: false, 
      cta: "Initiate Starter" 
    },
    { 
      name: "Professional", 
      desc: "Ideal for expanding businesses requiring dynamic integration.", 
      price: "₹74,999", 
      features: ["Up to 15 Pages Responsive Systems", "Bespoke High-Fidelity UI/UX Prototyping", "Full Custom CMS Integration Flow", "Advanced Analytics & Core Metrics tracking", "E-Commerce Systems (Up to 50 items)", "3 Months Priority SLA Maintenance Support"], 
      isPopular: true, 
      cta: "Choose Professional" 
    },
    { 
      name: "Enterprise", 
      desc: "Fully tailor-made cloud applications engineered to scale.", 
      price: "Custom", 
      features: ["Unlimited Page Scales & Web Apps", "Full-Stack Custom SaaS Engineering", "Dedicated Design & Architecture Team", "Compliance & Enterprise-Grade Security", "24/7 Priority SLA Architecture Support", "Dedicated Technology Account Manager"], 
      isPopular: false, 
      cta: "Consult Architects" 
    }
  ];

  const maintenancePlans = [
    { 
      name: "Basic Care", 
      desc: "Essential monitoring to keep your software secure.", 
      price: "₹4,999", 
      features: ["Monthly Database Security Audits", "Plugin & Node Core Updates", "Uptime & Port Health Monitoring", "Standard SLA Email Support Channel", "Monthly Cloud Recovery Backups"] 
    },
    { 
      name: "Pro Support", 
      desc: "Active updates and continuous performance iterations.", 
      price: "₹14,999", 
      features: ["Everything inside Basic Care", "2 Hours Custom Content Updates", "Database & Code Optimization", "Priority Ticket & SLA Slack Integration", "Weekly Scheduled Cloud Backups"], 
      isPopular: true 
    },
    { 
      name: "Premium Ops", 
      desc: "Full cloud systems management and continuous audits.", 
      price: "₹29,999", 
      features: ["Everything inside Pro Support", "Unlimited Custom Content Updates", "Technical SEO Search Audit Logs", "Dedicated Software Engineer Assigned", "Daily Automated Multi-Region Backups"] 
    }
  ];

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

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-brand-blue/5 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-accent mb-6 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={13} className="text-brand-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase">Transparent Investment</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white"
          >
            Simple, Fair <span className="text-gradient">Pricing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Invest in your custom digital infrastructure with our structured plans. High quality, zero template compromises, and scalable architecture.
          </motion.p>
        </div>
      </section>

      {/* Project Pricing */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue dark:text-brand-accent uppercase mb-3 block">Design & Engineering</span>
            <h2 className="text-3xl font-heading font-extrabold text-gray-900 dark:text-white">Project Milestones</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">One-time transparent pricing for engineering highly polished applications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, idx) => (
              <motion.div 
                key={plan.name} 
                initial={{ opacity: 0, y: 25 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 ${
                  plan.isPopular 
                    ? "border-brand-accent/50 dark:border-brand-accent/50 shadow-[0_15px_40px_rgba(37,99,235,0.12)] md:-translate-y-4 bg-[#03050c]/90 text-white" 
                    : "border-gray-200 dark:border-white/5 hover:border-brand-blue/20 dark:hover:border-white/10 bg-white/60 dark:bg-[#03050c]/40"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-brand-blue to-brand-accent rounded-full text-[9px] font-bold text-white uppercase tracking-wider shadow-lg">
                    Recommended Choice
                  </div>
                )}
                
                <h3 className={`text-2xl font-heading font-bold mb-2 ${plan.isPopular ? "text-white" : "text-gray-900 dark:text-white"}`}>{plan.name}</h3>
                <p className={`text-xs mb-6 h-10 leading-relaxed ${plan.isPopular ? "text-gray-300" : "text-gray-600 dark:text-gray-400"}`}>{plan.desc}</p>
                
                <div className="mb-8 pb-6 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-4xl sm:text-5xl font-extrabold ${plan.isPopular ? "text-white" : "text-gray-900 dark:text-white"}`}>{plan.price}</span>
                    {plan.price !== "Custom" && <span className={`text-xs ${plan.isPopular ? "text-gray-300" : "text-gray-600 dark:text-gray-400"}`}>/system</span>}
                  </div>
                  
                  {/* Negotiable Pill Tag */}
                  <span className="inline-flex items-center mt-3 px-2.5 py-0.5 rounded-full bg-brand-accent/10 dark:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent text-[9px] font-bold uppercase tracking-wider">
                    Negotiable
                  </span>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-0.5" />
                      <span className={`text-xs leading-relaxed ${plan.isPopular ? "text-gray-200" : "text-gray-600 dark:text-gray-400"}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/contact" 
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-auto text-xs uppercase tracking-wider ${
                    plan.isPopular 
                      ? "bg-brand-blue hover:bg-brand-blue/90 text-white shadow-lg shadow-brand-blue/20" 
                      : "bg-gray-100 dark:bg-white/5 hover:bg-brand-blue dark:hover:bg-brand-blue text-gray-900 dark:text-white hover:text-white dark:hover:text-white border border-gray-200 dark:border-white/10"
                  }`}
                >
                  {plan.cta} <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance & Support */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue dark:text-brand-accent uppercase mb-3 block">Lifecycle Management</span>
            <h2 className="text-3xl font-heading font-extrabold text-gray-900 dark:text-white">Uptime Support</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Optional monthly support packages to keep your platform audited, fast, and optimized.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {maintenancePlans.map((plan, idx) => (
              <motion.div 
                key={plan.name} 
                initial={{ opacity: 0, y: 25 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 ${
                  plan.isPopular 
                    ? "border-brand-accent/40 dark:border-white/10 shadow-[0_15px_40px_rgba(37,99,235,0.08)] bg-white/70 dark:bg-[#03050c]/80" 
                    : "border-gray-200 dark:border-white/5 hover:border-brand-blue/20 dark:hover:border-white/10 bg-white/60 dark:bg-[#03050c]/40"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-brand-blue to-brand-accent rounded-full text-[9px] font-bold text-white uppercase tracking-wider shadow-lg">
                    Recommended SLA
                  </div>
                )}
                
                <h3 className="text-2xl font-heading font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-6 h-10 leading-relaxed">{plan.desc}</p>
                
                <div className="mb-8 pb-6 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">/mo</span>
                  </div>
                  
                  {/* Negotiable Pill Tag */}
                  <span className="inline-flex items-center mt-3 px-2.5 py-0.5 rounded-full bg-brand-accent/10 dark:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent text-[9px] font-bold uppercase tracking-wider">
                    Negotiable
                  </span>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-brand-blue dark:text-brand-accent shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/contact" 
                  className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-auto text-xs uppercase tracking-wider ${
                    plan.isPopular 
                      ? "bg-brand-blue text-white shadow-md hover:bg-brand-blue/90" 
                      : "bg-transparent border border-gray-300 dark:border-white/20 hover:bg-gray-150 dark:hover:bg-white/5 text-gray-600 dark:text-white"
                  }`}
                >
                  Select Plan <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic consulting CTA */}
      <section className="pb-24 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div 
            {...fadeIn} 
            className="glass-dark border border-brand-blue/30 rounded-3xl p-12 bg-white/70 dark:bg-[#03050c]/80 backdrop-blur-md relative overflow-hidden"
          >
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold mb-4 text-gray-900 dark:text-white">Uncertain about system requirements?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
              Our engineering team can help audit your product design, formulate server hosting options, and construct a tailor-made pipeline matching your budget loops.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-brand-dark font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md"
            >
              Book Architecture Session
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
