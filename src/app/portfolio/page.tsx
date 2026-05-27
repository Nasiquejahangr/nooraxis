"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code, Sparkles, Folder } from "lucide-react";
import Link from "next/link";
import Interactive3DTexture from "@/components/Interactive3DTexture";

const STATIC_FALLBACK_PROJECTS = [
  {
    title: "FinTech Dashboard",
    category: "Web App",
    desc: "A comprehensive financial analytics dashboard with real-time data visualization, secure multi-tenant metrics, and reporting.",
    tags: ["React", "Next.js", "Tailwind", "Recharts"],
    image: "bg-gradient-to-br from-indigo-950 to-slate-900",
    externalLink: "#",
    codeLink: "#"
  },
  {
    title: "E-Commerce Mobile App",
    category: "Mobile",
    desc: "Native shopping experience with AR product preview, fluid swiping patterns, and seamless secure Stripe checkout flow.",
    tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
    image: "bg-gradient-to-br from-emerald-950 to-teal-950",
    externalLink: "#",
    codeLink: "#"
  },
  {
    title: "SaaS Landing Page",
    category: "UI/UX",
    desc: "High-converting modern landing page design with custom glassmorphism aesthetics and custom cursor displacement grids.",
    tags: ["Figma", "Framer Motion", "Next.js"],
    image: "bg-gradient-to-br from-purple-950 to-fuchsia-950",
    externalLink: "#",
    codeLink: "#"
  },
  {
    title: "HealthCare Portal",
    category: "Web App",
    desc: "Secure patient management system with telemedicine video consultation capabilities and compliant record vaults.",
    tags: ["Vue.js", "Laravel", "WebRTC", "MySQL"],
    image: "bg-gradient-to-br from-blue-950 to-cyan-950",
    externalLink: "#",
    codeLink: "#"
  },
  {
    title: "Tech Startup Rebrand",
    category: "Branding",
    desc: "Complete visual identity overhaul including logo design, detailed brand guidelines, and high-fidelity marketing assets.",
    tags: ["Illustrator", "Photoshop", "Brand Strategy"],
    image: "bg-gradient-to-br from-orange-950 to-red-950",
    externalLink: "#",
    codeLink: "#"
  },
  {
    title: "Smart Home IoT App",
    category: "Mobile",
    desc: "Cross-platform mobile application to control and monitor smart home appliances and Bluetooth BLE peripherals in real-time.",
    tags: ["Flutter", "Firebase", "IoT", "BLE"],
    image: "bg-gradient-to-br from-slate-900 to-zinc-950",
    externalLink: "#",
    codeLink: "#"
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", "Web App", "Mobile", "UI/UX", "Branding"];

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          } else {
            setProjects(STATIC_FALLBACK_PROJECTS);
          }
        } else {
          setProjects(STATIC_FALLBACK_PROJECTS);
        }
      } catch (err) {
        console.error("Failed to load portfolio items, using static defaults.", err);
        setProjects(STATIC_FALLBACK_PROJECTS);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
            <span className="text-xs font-semibold tracking-[0.15em] uppercase">Showcase of Craft</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white"
          >
            Our <span className="text-gradient">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our curated gallery of architectural software products, gestural mobile apps, and custom enterprise SaaS systems.
          </motion.p>
        </div>
      </section>

      {/* Filter Menu */}
      <section className="pb-12 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 bg-slate-100/50 dark:bg-[#03050c]/50 p-1.5 rounded-full border border-gray-200 dark:border-white/5 max-w-md mx-auto backdrop-blur-md shadow-sm">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider focus:outline-none cursor-pointer ${
                    isActive ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="portfolio-underline"
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

      {/* Projects Grid */}
      <section className="pb-32 flex-grow relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 animate-pulse overflow-hidden h-[420px] flex flex-col">
                  <div className="h-56 w-full bg-gray-200 dark:bg-white/5" />
                  <div className="p-6 flex-grow space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-3/4 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full" />
                      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-5/6" />
                    </div>
                    <div className="flex gap-2 pt-4 mt-auto">
                      <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-full w-12" />
                      <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-full w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project._id || project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 flex flex-col h-full bg-white dark:bg-[#03050c]/60 transition-colors"
                  >
                    {/* Visual Card Image / Gradient Placeholder */}
                    <div className="h-56 w-full relative overflow-hidden flex items-center justify-center bg-slate-900 border-b border-gray-150 dark:border-white/5">
                      {project.image && project.image.startsWith("bg-") ? (
                        <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${project.image}`} />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      )}
                      
                      {/* Graphic Icon mesh overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:opacity-40 transition-opacity duration-500 z-10" />
                      
                      <div className="relative flex flex-col items-center justify-center gap-2 z-10 pointer-events-none">
                        <Folder size={28} className="text-white/20 group-hover:scale-110 duration-300" />
                        <span className="font-mono font-bold text-lg text-white/40 tracking-[0.2em] group-hover:text-white/60 transition-colors">
                          {project.title.substring(0, 3).toUpperCase()}
                        </span>
                      </div>

                      {/* Hover Overlay Portal */}
                      <div className="absolute inset-0 bg-[#050816]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                        {project.externalLink && (
                          <Link href={project.externalLink} target="_blank" className="w-12 h-12 rounded-2xl bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center text-white hover:scale-105 transition-all shadow-md">
                            <ExternalLink size={18} />
                          </Link>
                        )}
                        {project.codeLink && (
                          <Link href={project.codeLink} target="_blank" className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-white hover:scale-105 transition-all border border-white/10 backdrop-blur-md">
                            <Code size={18} />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Metadata Card Info */}
                    <div className="p-7 flex flex-col flex-grow">
                      <div className="text-brand-accent text-[10px] font-bold uppercase tracking-wider mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-xs leading-relaxed">
                        {project.desc}
                      </p>
                      
                      {/* Tags row */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                        {project.tags.map((tag: string) => (
                          <span key={tag} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-250 dark:border-white/10 text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
