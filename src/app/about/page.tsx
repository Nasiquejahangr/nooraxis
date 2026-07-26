"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Target,
  Lightbulb,
  Users,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";
import Interactive3DTexture from "@/components/Interactive3DTexture";

const fallbackGalleryImages = [
  { src: "/portfolio/apex.png", alt: "Nooraxis office and team photo" },
  { src: "/portfolio/chronos.png", alt: "Nooraxis workspace and culture" },
  { src: "/portfolio/lumina.png", alt: "Nooraxis collaboration moments" },
  {
    src: "/portfolio/valkyrie.png",
    alt: "Nooraxis authentic office environment",
  },
];

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  } as const;

  const { settings } = useSettings();
  const galleryImages = [
    ...(settings?.galleryImages && settings.galleryImages.length > 0
      ? settings.galleryImages.map((src, idx) => ({
          src,
          alt: `Nooraxis gallery image ${idx + 1}`,
        }))
      : []),
    ...fallbackGalleryImages,
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden tech-grid min-h-screen">
      {/* Page Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-6 md:pt-12 pb-20 px-6 overflow-hidden">
        {/* Interactive 3D Mesh Particle Grid */}
        <Interactive3DTexture />

        {/* Subtle mesh background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-brand-accent/10 dark:bg-brand-accent/15 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-7000" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-brand-blue/5 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-accent mb-6 shadow-sm backdrop-blur-md"
          >
            <span className="text-xs font-semibold tracking-[0.15em] uppercase font-mono">
              Our Identity
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white"
          >
            About <span className="text-gradient">Nooraxis</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-sans"
          >
            We don't write generic, clinical lines of code or construct
            automated templates. We are a tightly knit collective of senior
            designers, engineers, and product builders obsessed with layout
            fidelity, clean engineering architecture, and direct transparency.
            We craft custom digital systems built to endure and inspire.
          </motion.p>
        </div>
      </section>

      {/* Philosophy & Purpose */}
      <section className="py-24 bg-white dark:bg-[#050816]/30 relative transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              {...fadeIn}
              className="glass-dark p-10 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-brand-accent/30 dark:hover:border-brand-accent/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative bg-white/50 dark:bg-transparent"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-brand-blue/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center mb-6 border border-brand-blue/10">
                  <Target size={26} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  To eliminate digital mediocrity by engineering custom,
                  high-performance web systems. We exist to replace standard
                  cookie-cutter frameworks with deep, deliberate digital design,
                  ensuring our clients receive transparent collaboration and
                  senior-level execution.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 text-xs text-brand-blue font-semibold uppercase tracking-wider font-mono">
                Delivering Excellence
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-dark p-10 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative bg-white/50 dark:bg-transparent"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 dark:text-purple-400 flex items-center justify-center mb-6 border border-purple-500/10">
                  <Lightbulb size={26} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  To establish a new standard where digital products are treated
                  with the respect of physical craftsmanship. We envision a
                  modern web where speed is instantaneous, interface elements
                  feel alive, and clean codebase health is never sacrificed for
                  speed of delivery.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 text-xs text-purple-500 dark:text-purple-400 font-semibold uppercase tracking-wider font-mono">
                Shaping the Web
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50 dark:bg-[#070b16] transition-colors duration-500 relative overflow-hidden border-y border-gray-100 dark:border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[25%] w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[25%] w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            {...fadeIn}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue dark:text-brand-accent uppercase mb-3 block font-mono">
              Real-World Principles
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-gray-900 dark:text-white">
              What We Stand For
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base max-w-xl mx-auto mt-2">
              We operate on simple, uncompromising human principles that ensure
              high-integrity collaboration and beautiful digital delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: HeartHandshake,
                title: "Direct Human Collaboration",
                desc: "We completely reject corporate gatekeeping, sales pitches, and outsourced black boxes. You collaborate directly with the senior designers and engineers building your software.",
                color: "text-brand-blue bg-brand-blue/10 border-brand-blue/15",
              },
              {
                icon: Sparkles,
                title: "Artisanal Craft & Detail",
                desc: "Every pixel, transition curve, and backend database query is shaped by hand with precision. Clean, easily readable source code is just as vital to us as organic, delightful animations.",
                color:
                  "text-brand-accent bg-brand-accent/10 border-brand-accent/15",
              },
              {
                icon: ShieldCheck,
                title: "Long-Term Accountability",
                desc: "We don't launch a site and vanish. We act as your dedicated technical partners, proactively supporting your scaling needs and ensuring your cloud configuration is secure and durable.",
                color: "text-green-500 bg-green-500/10 border-green-500/15",
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-dark border border-gray-200 dark:border-white/5 p-8 rounded-3xl hover:border-brand-blue/30 transition-colors relative bg-white/70 dark:bg-[#03050c]/90 text-center"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 border ${value.color}`}
                >
                  <value.icon size={26} />
                </div>
                <h4 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentic Gallery */}
      <section className="py-24 bg-gray-50 dark:bg-[#070b16] transition-colors duration-500 relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            {...fadeIn}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue dark:text-brand-accent uppercase mb-3 block font-mono">
              Authentic Moments
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white">
              Real Nooraxis Moments
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              A real gallery of our people, workspace, and culture—so every
              visitor feels the authentic energy behind Nooraxis.
            </p>
          </motion.div>

          <div className="horizontal-scroll overflow-hidden rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#111827]/70 p-4 shadow-sm">
            <motion.div
              className="horizontal-scroll-track flex gap-6"
              animate={{}}
            >
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <motion.div
                  key={`${image.src}-${index}`}
                  {...fadeIn}
                  className="scroll-item relative min-w-[320px] max-w-[320px] aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-950/60 border border-gray-200 dark:border-white/10 shadow-sm"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, (max-width: 1280px) 45vw, 320px"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Journey Road */}
      <section className="py-24 bg-white dark:bg-transparent transition-colors duration-500 relative">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            {...fadeIn}
            className="text-center mb-20 max-w-2xl mx-auto"
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-brand-blue dark:text-brand-accent uppercase mb-3 block font-mono">
              Our Timeline
            </span>
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
              The Nooraxis Story
            </h2>
          </motion.div>

          <div className="relative border-l border-brand-blue/20 dark:border-white/5 pl-8 sm:pl-10 space-y-12">
            {[
              {
                year: "2024",
                title: "Boutique Foundations",
                desc: "Nooraxis was founded by a small collective of passionate builders tired of slow-loading sites and generic, rigid themes. We established our core value: delivering hand-crafted digital excellence directly to ambitious clients.",
              },
              {
                year: "2025",
                title: "Scaling Technical Trust",
                desc: "Expanded our operations globally, engineering robust software, multi-tenant dashboards, and custom user portals for fast-scaling startups across the United States, Europe, and Asia.",
              },
              {
                year: "2026",
                title: "Next-Generation Immersive Web",
                desc: "Pioneering state-of-the-art interactive 3D components, high-integrity government certifications, and complex database architectures, while preserving our boutique, human-centric approach.",
              },
            ].map((step, idx) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group"
              >
                {/* Glowing Node Dot */}
                <div className="absolute -left-[41px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-[#f8fafc] dark:bg-[#050816] border-2 border-brand-blue flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
                </div>

                <div className="glass-dark border border-gray-200 dark:border-white/5 rounded-3xl p-8 bg-white/50 dark:bg-[#03050c]/50 hover:border-brand-blue/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-bold text-brand-accent bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/15 px-3 py-1 rounded-full">
                      {step.year}
                    </span>
                    <h4 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
