"use client";

import { motion } from "framer-motion";
import { ArrowRight, Monitor, Code2, Megaphone, Search, PenTool, Layout, Building2, Briefcase, Rocket, Cloud } from "lucide-react";
import Link from "next/link";
import Interactive3DTexture from "@/components/Interactive3DTexture";

export default function Services() {
  const fadeIn = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  } as const;

  // Custom categorized divisions
  const divisions = [
    {
      name: "Core Engineering & Cloud Systems",
      desc: "Robust, high-availability, and secure architectural backbones for web and cloud applications.",
      bg: "bg-brand-blue/5 dark:bg-brand-blue/10 border-brand-blue/20",
      services: [
        { icon: Monitor, title: "Web Development", desc: "High-performance websites built on Next.js and React. Highly scalable and SEO friendly.", tags: ["Next.js", "React", "TypeScript", "Tailwind"] },
        { icon: Cloud, title: "SaaS Systems", desc: "Multi-tenant cloud Software as a Service products featuring secure customer dashboards and subscription plans.", tags: ["SaaS", "Multi-Tenant", "Stripe API", "Node.js"] },
        { icon: Code2, title: "Custom Software", desc: "Tailor-made backend databases and enterprise-grade tools crafted to automate complex flows.", tags: ["Databases", "Mongoose", "REST APIs", "AWS"] },
      ]
    },
    {
      name: "Branding & Interface Usability",
      desc: "Stunning, gestural, and highly polished user experiences that establish deep digital authority.",
      bg: "bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/20",
      services: [
        { icon: Layout, title: "UI/UX Design", desc: "Intuitive layouts, clickable interactive wireframes, and harmonious design styles crafted for retention.", tags: ["Figma", "User Journey", "Micro-Interactions"] },
        { icon: PenTool, title: "Branding & Strategy", desc: "Cohesive logo assets, branding rulebooks, and visual typography that resonate with your users.", tags: ["Identity", "Brand Rules", "Market Fit"] },
        { icon: Briefcase, title: "Corporate Portfolios", desc: "Elite portfolios for creators and firms built to showcase achievements with liquid animations.", tags: ["Portfolios", "Custom Layouts", "Aesthetics"] },
      ]
    },
    {
      name: "Performance & Search Operations",
      desc: "Data-driven organic growth and targeted advertising frameworks built for immediate conversions.",
      bg: "bg-green-500/5 dark:bg-green-500/10 border-green-500/20",
      services: [
        { icon: Search, title: "SEO Optimization", desc: "Technical index audits, targeted search terms mapping, and page-speed tweaks for peak ranking.", tags: ["Technical SEO", "Audits", "Speed Tuning"] },
        { icon: Megaphone, title: "Growth Marketing", desc: "Performance advertising campaigns and social visibility strategies backed by comprehensive analytics.", tags: ["PPC", "Ad Funnels", "Conversion Analytics"] },
        { icon: Rocket, title: "Landing Pages", desc: "Focused, high-converting product pages optimized for maximum sign-ups and rapid page loads.", tags: ["Landing Pages", "A/B Ready", "Fast Rendering"] },
      ]
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
          <div className="absolute top-[10%] left-[25%] w-[450px] h-[450px] bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-[110px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[10%] right-[25%] w-[450px] h-[450px] bg-brand-accent/10 dark:bg-brand-accent/15 rounded-full blur-[110px] mix-blend-screen animate-pulse" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-brand-blue/5 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-accent mb-6 shadow-sm backdrop-blur-md"
          >
            <span className="text-xs font-semibold tracking-[0.15em] uppercase">Expertise Divisions</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white"
          >
            Our <span className="text-gradient">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            High-fidelity technical execution and structured digital services designed to scale your operations, conversion rates, and business metrics.
          </motion.p>
        </div>
      </section>

      {/* Services Divisions Grid */}
      <section className="py-12 pb-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl space-y-24">
          {divisions.map((div, dIdx) => (
            <div key={div.name} className="space-y-10">
              {/* Division Title Block */}
              <motion.div 
                {...fadeIn}
                className="max-w-3xl border-l-4 border-brand-accent pl-6 py-2"
              >
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 dark:text-white tracking-tight">{div.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">{div.desc}</p>
              </motion.div>

              {/* Division Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {div.services.map((service, sIdx) => (
                  <motion.div 
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: sIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-dark p-8 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 group flex flex-col justify-between h-full bg-white/60 dark:bg-transparent"
                  >
                    <div>
                      {/* Icon Capsule */}
                      <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 dark:bg-brand-blue/15 text-brand-blue flex items-center justify-center mb-6 group-hover:scale-105 duration-300 border border-brand-blue/10">
                        <service.icon size={26} />
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                    </div>
                    
                    <div className="space-y-6 mt-auto">
                      {/* Chip tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-black/5 dark:border-white/5">
                        {service.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link 
                        href="/contact" 
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900/5 dark:bg-white/5 hover:bg-brand-blue dark:hover:bg-brand-blue text-gray-900 dark:text-white hover:text-white dark:hover:text-white font-semibold transition-colors text-sm"
                      >
                        Request Specification <ArrowRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern High-End CTA Section */}
      <section className="py-24 relative bg-gray-50 dark:bg-[#070b16] transition-colors duration-500 border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div 
            {...fadeIn}
            className="glass-dark border border-brand-blue/20 dark:border-brand-blue/30 rounded-3xl p-10 sm:p-14 text-center bg-white/80 dark:bg-[#03050c]/80 backdrop-blur-2xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none" />
            
            <h2 className="text-3xl font-heading font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">Need a Custom Software Solution?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't see your specific platform metrics listed? We architect custom APIs, secure billing logic, and custom dashboards tailored exactly to your operations.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold transition-all shadow-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] text-sm"
            >
              Consult with our Architects <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
