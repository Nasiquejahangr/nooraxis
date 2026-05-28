"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Smartphone,
  Megaphone,
  CheckCircle2,
  ShieldCheck,
  Award,
  BadgeCheck,
  Building2,
  Shield,
  Calendar,
  Activity,
  Fingerprint,
  Terminal,
  Sparkles,
  Layers,
  Zap,
  Globe
} from "lucide-react";
import Interactive3DTexture from "@/components/Interactive3DTexture";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  } as const;

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden tech-grid min-h-screen">

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-4 md:pt-8 pb-28 px-6 overflow-hidden">
        {/* Interactive 3D Mesh Particle Grid */}
        <Interactive3DTexture />

        {/* Subtle mesh background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-[130px] mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-[20%] right-[15%] w-[600px] h-[600px] bg-brand-accent/10 dark:bg-brand-accent/15 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-7000" />
          {/* Faded horizontal strip */}
          <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/10 dark:via-brand-blue/20 to-transparent" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text & Metrics */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-brand-blue/5 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-accent shadow-sm backdrop-blur-md hover:scale-102 transition-transform cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase font-mono">Design & Engineering Studio</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7.5xl font-heading font-extrabold tracking-tight leading-[1.05] text-gray-900 dark:text-white"
              >
                We engineer custom <span className="text-gradient font-black">digital products</span> that define industries.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                We are a tightly knit collective of designers and engineers crafting fast, secure, and beautiful digital systems. No template shortcuts, no empty promises—just rigorous engineering and honest collaboration.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  href="/portfolio"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-semibold transition-all shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.45)] flex items-center justify-center gap-2 group cursor-pointer text-sm"
                >
                  View Our Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/40 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 text-gray-800 dark:text-white font-semibold transition-all backdrop-blur-md flex items-center justify-center text-sm"
                >
                  Explore Services
                </Link>
              </motion.div>

              {/* Statistical highlights row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-10 pt-8 border-t border-black/5 dark:border-white/5 max-w-md mx-auto lg:mx-0"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-heading font-black text-brand-accent">250+</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 font-mono">Websites Delivered</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-heading font-black text-brand-accent">3+ Years</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 font-mono">Studio Growth</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-heading font-black text-brand-accent">99%</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 font-mono">Client Success</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: High-Fidelity Stats Grid Console */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 hidden lg:block relative"
            >
              {/* Outer HSL glows */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/15 to-brand-accent/15 rounded-3xl blur-2xl pointer-events-none" />
              
              {/* Glass Stats Console Container */}
              <div className="glass-dark border border-gray-200 dark:border-white/10 rounded-3xl p-8 relative z-10 bg-white/60 dark:bg-[#03050c]/85 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                
                {/* Tech header inside the console card */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">[SYS-PERFORMANCE]</span>
                  </div>
                  <span className="text-[9px] font-bold text-brand-blue font-mono">METRICS LIVE //</span>
                </div>

                {/* 2x2 grid similar to reference site, but styled with high-fidelity glass */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="glass bg-slate-50/50 dark:bg-black/40 p-5 rounded-2xl border border-gray-200/55 dark:border-white/5 hover:border-brand-blue/30 transition-colors shadow-sm">
                    <div className="text-3xl font-heading font-black text-brand-blue dark:text-white">1125+</div>
                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1.5 font-mono">Global Projects</div>
                  </div>
                  <div className="glass bg-slate-50/50 dark:bg-black/40 p-5 rounded-2xl border border-gray-200/55 dark:border-white/5 hover:border-brand-blue/30 transition-colors shadow-sm mt-4">
                    <div className="text-3xl font-heading font-black text-brand-blue dark:text-white">25+</div>
                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1.5 font-mono">Countries Served</div>
                  </div>
                  <div className="glass bg-slate-50/50 dark:bg-black/40 p-5 rounded-2xl border border-gray-200/55 dark:border-white/5 hover:border-brand-blue/30 transition-colors shadow-sm">
                    <div className="text-3xl font-heading font-black text-brand-blue dark:text-white">3450+</div>
                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1.5 font-mono">Happy Clients</div>
                  </div>
                  <div className="glass bg-slate-50/50 dark:bg-black/40 p-5 rounded-2xl border border-gray-200/55 dark:border-white/5 hover:border-brand-blue/30 transition-colors shadow-sm mt-4">
                    <div className="text-3xl font-heading font-black text-brand-blue dark:text-white">50+</div>
                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1.5 font-mono">Senior Builders</div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                  <span>AUDITED SYSTEM OK //</span>
                  <span className="text-green-500 font-bold">● SECURE UPTIME</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Official Government MSME Trust Section */}
      <section className="py-0 relative overflow-hidden bg-gray-50/60 dark:bg-[#070b16] border-y border-gray-100 dark:border-white/5 transition-colors duration-500">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[25%] w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[25%] w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Certifications Text */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                {...fadeIn}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.05)]"
              >
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-xs font-semibold tracking-wider uppercase">Official Government Registration</span>
              </motion.div>
              <motion.h2
                {...fadeIn}
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-gray-900 dark:text-white leading-[1.15]"
              >
                Government Recognized <br />
                <span className="text-brand-accent">MSME Enterprise</span>
              </motion.h2>
              <motion.p
                {...fadeIn}
                className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed"
              >
                Nooraxis Technologies is registered under the **Ministry of Micro, Small & Medium Enterprises (MSME)**, Government of India. This certification signifies our dedication to professional business operations, compliance, and trusted technical delivery.
              </motion.p>

              <motion.div {...fadeIn} className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { title: "Udyam Certified", icon: Award },
                  { title: "Verified Identity", icon: ShieldCheck }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                    <item.icon size={16} className="text-brand-accent" />
                    <span>{item.title}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Premium Certificate Mock Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative"
            >
              <div className="absolute inset-0 bg-brand-blue/5 dark:bg-brand-blue/15 rounded-3xl blur-xl" />
              <div className="glass-dark border border-brand-blue/20 dark:border-brand-blue/30 rounded-3xl p-6 sm:p-10 relative z-10 bg-white/70 dark:bg-[#03050c]/90 backdrop-blur-2xl shadow-[0_8px_30px_rgba(37,99,235,0.06)] hover:border-brand-blue/40 transition-colors duration-300">

                {/* Certificate Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center text-brand-blue dark:text-brand-accent border border-brand-blue/15">
                      <Shield size={24} />
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-heading font-bold tracking-wide text-lg">Udyam Registration</div>
                      <div className="text-green-600 dark:text-green-400 text-xs font-semibold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 size={12} /> Verified Enterprise
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 rounded-lg bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 font-mono text-brand-accent font-bold tracking-wider text-xs shadow-inner">
                    UDYAM-BR-27-XXXXXXX
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-5 text-sm">
                  <div>
                    <div className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Building2 size={12} /> Enterprise Name</div>
                    <div className="text-gray-900 dark:text-white font-semibold">Nooraxis Technologies</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><BadgeCheck size={12} /> Enterprise Type</div>
                    <div className="text-gray-900 dark:text-white font-semibold">Micro Enterprise</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Activity size={12} /> Major Activity</div>
                    <div className="text-gray-900 dark:text-white font-semibold">Services (IT & Digital Solutions)</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12} /> Date of Registration</div>
                    <div className="text-gray-900 dark:text-white font-semibold">21 May 2026</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Fingerprint size={12} className="text-brand-accent" />
                    <span>Registered in accordance with MSME Act, 2006</span>
                  </div>
                  <span className="font-mono text-green-500/80 font-semibold uppercase">Active Status</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bento Grid Core Services */}
      <section className="py-28 bg-white dark:bg-[#050816]/30 relative transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div {...fadeIn} className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue dark:text-brand-accent uppercase mb-3 block font-mono">Our Craft</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-6 text-gray-900 dark:text-white">What We Do Best</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed">
              We focus on pristine frontend experiences, custom cloud applications, and sustainable organic traffic. Every line of code is written with deliberate intent.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Bento Card 1: Web Development (Col-Span 2) */}
            <motion.div
              variants={fadeIn}
              className="md:col-span-2 glass-dark p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative bg-white/50 dark:bg-transparent"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center mb-6">
                  <Code size={22} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">Custom Web Engineering</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl leading-relaxed text-sm">
                  We build high-performance web systems optimized for instantaneous load times and rigorous type-safety. Leveraging Next.js and secure REST/GraphQL architectures, our codebases are clean, maintainable, and built to scale.
                </p>
              </div>

              {/* Custom Tech Stack Visual chips */}
              <div className="flex flex-wrap gap-2 relative z-10 pt-4 border-t border-black/5 dark:border-white/5">
                {["React / Next.js", "Node.js API", "Mongoose DB", "Tailwind CSS", "REST / GraphQL", "TypeScript"].map((chip) => (
                  <span key={chip} className="px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Bento Card 2: Mobile Apps (Col-Span 1) */}
            <motion.div
              variants={fadeIn}
              className="glass-dark p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden bg-white/50 dark:bg-transparent"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 dark:text-purple-400 flex items-center justify-center mb-6">
                  <Smartphone size={22} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">Bespoke Mobile Apps</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
                  Fluid, cross-platform mobile apps for iOS and Android built on React Native and Flutter. We prioritize lightweight codebases, responsive UI layers, and natural gestural interactions.
                </p>
              </div>
              <div className="flex gap-2.5 text-xs font-semibold text-purple-600 dark:text-purple-400 pt-4 border-t border-black/5 dark:border-white/5">
                <span>Flutter / React Native</span>
                <span>•</span>
                <span>iOS & Android</span>
              </div>
            </motion.div>

            {/* Bento Card 3: Digital Marketing & SEO (Col-Span 1) */}
            <motion.div
              variants={fadeIn}
              className="glass-dark p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden bg-white/50 dark:bg-transparent"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-green-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-green-500/10 transition-colors" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                  <Megaphone size={22} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">Organic Visibility & SEO</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
                  No spammy shortcuts or empty metrics. We optimize your technical speed, build high-converting landing pages, and structure index audits to drive sustainable, organic commercial intent.
                </p>
              </div>
              <div className="flex gap-2.5 text-xs font-semibold text-green-600 dark:text-green-400 pt-4 border-t border-black/5 dark:border-white/5">
                <span>Organic Growth</span>
                <span>•</span>
                <span>Technical SEO</span>
              </div>
            </motion.div>

            {/* Bento Card 4: Custom Enterprise Software (Col-Span 2) */}
            <motion.div
              variants={fadeIn}
              className="md:col-span-2 glass-dark p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative bg-white/50 dark:bg-transparent"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-brand-accent/10 transition-colors" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 dark:bg-brand-accent/20 text-brand-accent flex items-center justify-center mb-6">
                  <Layers size={22} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">Custom SaaS & Cloud Backends</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl leading-relaxed text-sm">
                  Complete product development from database normalization to production hosting. We engineer secure Stripe payment models, intuitive dashboard layouts, and robust server configurations.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/5">
                {["SaaS Dashboard", "Cloud Deployments", "Stripe Checkout Integration", "High Availability Infrastructure"].map((item) => (
                  <span key={item} className="px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div className="text-center mt-14">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-accent transition-colors group cursor-pointer"
            >
              Explore all services and parameters
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Key Metrics */}
      <section className="py-28 relative overflow-hidden bg-gray-50/60 dark:bg-[#050816] transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue dark:text-brand-accent uppercase block font-mono">Uncompromising Standards</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold leading-tight text-gray-900 dark:text-white">
                Why founders partner <br />
                <span className="text-gradient">with Nooraxis</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
                Building high-fidelity software requires a relentless commitment to performance, clean layout structures, and absolute honesty. We work as an extension of your product team—no middlemen, no gatekeeping.
              </p>

              <ul className="space-y-4 pt-4">
                {[
                  "Direct access to senior designer-builders",
                  "Transparent codebases with zero vendor lock-in",
                  "Performance-first engineering as a core standard",
                  "Reliable, production-ready cloud deployments"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0">
                      <CheckCircle2 size={13} className="text-brand-blue dark:text-brand-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Grid of numbers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-accent/20 rounded-3xl blur-2xl pointer-events-none" />
              <div className="glass-dark border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 relative z-10 bg-white/50 dark:bg-transparent">
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass bg-white/40 dark:bg-black/40 p-6 rounded-2xl text-center border border-white/20 dark:border-white/5 shadow-sm">
                    <div className="text-4xl font-heading font-extrabold text-brand-accent mb-2">99%</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Satisfaction</div>
                  </div>
                  <div className="glass bg-white/40 dark:bg-black/40 p-6 rounded-2xl text-center border border-white/20 dark:border-white/5 shadow-sm mt-8">
                    <div className="text-4xl font-heading font-extrabold text-brand-accent mb-2">250+</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects Delivered</div>
                  </div>
                  <div className="glass bg-white/40 dark:bg-black/40 p-6 rounded-2xl text-center border border-white/20 dark:border-white/5 shadow-sm">
                    <div className="text-4xl font-heading font-extrabold text-brand-accent mb-2">15+</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Countries Served</div>
                  </div>
                  <div className="glass bg-white/40 dark:bg-black/40 p-6 rounded-2xl text-center border border-white/20 dark:border-white/5 shadow-sm mt-8">
                    <div className="text-4xl font-heading font-extrabold text-brand-accent mb-2">24/7</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Reliable Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern High-End CTA Section */}
      <section className="py-24 relative bg-white dark:bg-[#070b16] transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div
            {...fadeIn}
            className="glass-dark border border-brand-blue/20 dark:border-brand-blue/30 rounded-3xl p-10 sm:p-14 text-center bg-white/80 dark:bg-[#03050c]/80 backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">Let's build something outstanding</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Have an idea for a web platform, SaaS product, or highly custom mobile experience? Reach out and let's explore how we can bring it to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-[#050816] font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg cursor-pointer text-sm"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
