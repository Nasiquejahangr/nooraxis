"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Heart, 
  Coffee, 
  Globe, 
  ArrowRight, 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  Loader2, 
  Lock, 
  LogOut, 
  Zap, 
  Target, 
  Award,
  Sparkles,
  Users,
  Clock,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Interactive3DTexture from "@/components/Interactive3DTexture";

const STATIC_FALLBACK_POSITIONS = [
  { title: "Senior React Developer", type: "Full-Time", location: "Remote", dept: "Engineering", category: "Job" },
  { title: "UI/UX Designer", type: "Full-Time", location: "San Francisco, CA", dept: "Design", category: "Job" },
  { title: "Digital Marketing Manager", type: "Full-Time", location: "Remote", dept: "Marketing", category: "Job" },
  { title: "Frontend Development Intern", type: "Internship", location: "Remote", dept: "Engineering", category: "Intern" },
  { title: "UI/UX Design Intern", type: "Internship", location: "Remote", dept: "Design", category: "Intern" },
];

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState("General Application");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [error, setError] = useState("");
  
  const [positions, setPositions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDept, setActiveDept] = useState("All");

  // Candidate Authentication States
  const [candidate, setCandidate] = useState<{ name: string; email: string } | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authTab, setAuthTab] = useState<"login" | "register">("register");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // Silent session restore on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/candidate/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setCandidate(data.user);
          }
        }
      } catch (err) {
        console.error("Failed to restore candidate session:", err);
      } finally {
        setIsAuthLoading(false);
      }
    }
    checkSession();
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string; // only for register

    const endpoint = authTab === "register" ? "/api/candidate/register" : "/api/candidate/login";
    const body = authTab === "register" ? { name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setCandidate(data.user);
    } catch (err: any) {
      setAuthError(err.message || "An unexpected error occurred.");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/candidate/logout", { method: "POST" });
      setCandidate(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPositions(data);
          } else {
            setPositions(STATIC_FALLBACK_POSITIONS);
          }
        } else {
          setPositions(STATIC_FALLBACK_POSITIONS);
        }
      } catch (err) {
        console.error("Failed to load jobs from DB, using fallback defaults.", err);
        setPositions(STATIC_FALLBACK_POSITIONS);
      } finally {
        setIsLoading(false);
      }
    }
    loadJobs();
  }, []);

  const handleApplyClick = (title: string) => {
    setSelectedPosition(title);
    setIsSuccess(false);
    setError("");
    setIsApplyModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = selectedPosition;
    const portfolioUrl = formData.get("portfolio_url") as string;
    const resumeUrl = formData.get("resume_url") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          position,
          portfolioUrl,
          resumeUrl,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit job application");
      }

      setIsSuccess(true);
      if (formRef.current) formRef.current.reset();
      setSelectedPosition("General Application");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPositions = activeDept === "All"
    ? positions
    : positions.filter(pos => pos.dept.toLowerCase() === activeDept.toLowerCase());

  const internsList = filteredPositions.filter(
    (pos) => pos.category === "Intern" || pos.type.toLowerCase() === "internship"
  );
  const jobsList = filteredPositions.filter(
    (pos) => pos.category !== "Intern" && pos.type.toLowerCase() !== "internship"
  );

  const inputCls = "w-full bg-slate-50/50 dark:bg-[#070913]/60 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all font-sans";
  const labelCls = "text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono";

  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-[#05070f] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
      {/* Decorative Blur Background Mesh */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="pt-24 md:pt-36 pb-20 relative overflow-hidden border-b border-slate-200/60 dark:border-white/5 z-10">
        <Interactive3DTexture />
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 mb-8 text-xs font-bold uppercase tracking-widest font-mono shadow-sm"
          >
            <Sparkles size={12} className="text-brand-blue dark:text-brand-accent animate-spin-slow" />
            <span>[ Nooraxis Careers Portal ]</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.8 }} 
            className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold mb-8 text-slate-900 dark:text-white tracking-tight leading-[1.1]"
          >
            Craft Elite Products. <br />
            Work with <span className="text-gradient bg-gradient-to-r from-brand-blue via-[#8b5cf6] to-pink-500 font-black">Absolute Autonomy</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }} 
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 font-sans"
          >
            We don't do middle management, bloated process spreadsheets, or endless daily check-ins. We write clean, high-performance code, construct premium designs, and ship world-class software.
          </motion.p>

          {/* Quick Metrics Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-6"
          >
            {[
              { val: "100%", tag: "Remote-First", label: "Work Anywhere" },
              { val: "Async", tag: "Autonomous", label: "No Bloated Syncs" },
              { val: "Elite", tag: "Craftsmanship", label: "High-Caliber Squads" },
              { val: "Direct", tag: "4-Step Hire", label: "Fast Communications" }
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 backdrop-blur-md text-center shadow-sm">
                <div className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-purple-500 bg-clip-text text-transparent font-heading">{stat.val}</div>
                <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">{stat.tag}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Operational Philosophy */}
      <section className="py-24 relative overflow-hidden border-b border-slate-200/60 dark:border-white/5 z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div {...fadeIn} className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest font-mono">
              [ THE NOORAXIS WAY ]
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">Our Operational Philosophy</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              We cut out administrative overhead so our engineers, designers, and marketers can do their absolute best work without friction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Globe, 
                title: "Pure Autonomy", 
                code: "[OPS-01]", 
                desc: "We measure shipping frequency and project success, not green online status circles. Work on your schedule.",
                accent: "group-hover:border-blue-500/40 hover:shadow-blue-500/5",
                iconBg: "bg-blue-500/10 text-blue-500"
              },
              { 
                icon: Heart, 
                title: "Full Coverage", 
                code: "[OPS-02]", 
                desc: "Comprehensive health, dental, and wellness plans to make sure you stay physically and mentally at your best.",
                accent: "group-hover:border-emerald-500/40 hover:shadow-emerald-500/5",
                iconBg: "bg-emerald-500/10 text-emerald-500"
              },
              { 
                icon: Award, 
                title: "Craft Stipend", 
                code: "[OPS-03]", 
                desc: "Yearly educational and hardware budget for books, high-end online courses, software licenses, or custom setups.",
                accent: "group-hover:border-purple-500/40 hover:shadow-purple-500/5",
                iconBg: "bg-purple-500/10 text-purple-500"
              },
              { 
                icon: Coffee, 
                title: "Rest & Reset", 
                code: "[OPS-04]", 
                desc: "Flexible, self-managed paid time off. Take the time you need to reset, recharge, and sustain your passion.",
                accent: "group-hover:border-pink-500/40 hover:shadow-pink-500/5",
                iconBg: "bg-pink-500/10 text-pink-500"
              }
            ].map((benefit, idx) => (
              <motion.div 
                key={benefit.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl border border-slate-200/80 dark:border-white/5 transition-all duration-300 bg-white/60 dark:bg-white/[0.02] shadow-sm hover:-translate-y-2 group relative overflow-hidden hover:shadow-lg ${benefit.accent}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-blue/5 to-transparent rounded-bl-[100px] pointer-events-none" />
                <span className="absolute top-5 right-5 text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold">{benefit.code}</span>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 font-bold ${benefit.iconBg}`}>
                  <benefit.icon size={22} />
                </div>
                <h4 className="font-bold text-lg mb-3 text-slate-900 dark:text-white tracking-tight">{benefit.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Pipeline Section */}
      <section className="py-24 bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200/60 dark:border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div {...fadeIn} className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-[10px] font-bold uppercase tracking-widest font-mono">
              [ DIRECT PIPELINE ]
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">How We Hire</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Our process is straightforward, respectful of your time, and focuses entirely on practical skills.
            </p>
          </motion.div>

          <div className="relative">
            {/* Visual connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t border-dashed border-slate-200 dark:border-white/10 hidden md:block -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { 
                  step: "01", 
                  title: "Profile Submission", 
                  desc: "Submit your work link, portfolio, or CV. We look for concrete proof of craft over corporate badges.",
                  icon: Users,
                  theme: "bg-blue-500/10 text-blue-500 border-blue-500/20"
                },
                { 
                  step: "02", 
                  title: "Skills Discussion", 
                  desc: "A conversational 30-min talk with a senior team member about architecture, patterns, or UX flow. No trick trivia.",
                  icon: Target,
                  theme: "bg-purple-500/10 text-purple-500 border-purple-500/20"
                },
                { 
                  step: "03", 
                  title: "Product Pairing", 
                  desc: "A collaborative 90-min session on a real-world building task. Experience what pair programming with us feels like.",
                  icon: Zap,
                  theme: "bg-pink-500/10 text-pink-500 border-pink-500/20"
                },
                { 
                  step: "04", 
                  title: "Elite Offer", 
                  desc: "No lowballs, transparent package models, and a final decision sent straight to you within 48 hours of pairing.",
                  icon: ShieldCheck,
                  theme: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                }
              ].map((pipe, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="bg-white dark:bg-[#070914] border border-slate-200/80 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center relative group hover:border-slate-300 dark:hover:border-white/10 transition-colors"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border font-extrabold ${pipe.theme}`}>
                    <pipe.icon size={24} />
                  </div>
                  <div className="absolute top-4 left-6 text-2xl font-mono font-black text-slate-200 dark:text-white/5 tracking-wider">{pipe.step}</div>
                  <h4 className="font-bold text-base mb-2 text-slate-900 dark:text-white font-heading">{pipe.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{pipe.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div {...fadeIn} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[10px] font-bold uppercase tracking-widest font-mono">
                [ TEAM EXPANSION ]
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">Active Opportunities</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Join our compact, focus-driven digital engineering and visual design squads.
              </p>
            </div>
            
            {/* Sliding Tab Switcher */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm self-start md:self-auto">
              {['All', 'Engineering', 'Design', 'Marketing'].map(dept => {
                const isActive = activeDept === dept;
                return (
                  <button 
                    key={dept} 
                    onClick={() => setActiveDept(dept)}
                    className="relative px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest font-mono transition-colors duration-300 focus:outline-none cursor-pointer"
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeDept"
                        className="absolute inset-0 bg-brand-blue rounded-xl shadow-md shadow-brand-blue/20"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                      {dept}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 animate-pulse h-32 flex flex-col justify-center space-y-3">
                  <div className="h-6 bg-slate-200 dark:bg-white/10 rounded w-1/3 animate-pulse" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-20" />
                    <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPositions.length === 0 ? (
            <div className="text-center py-20 bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm">
              <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No open positions listed in {activeDept} right now.</p>
            </div>
          ) : (
            <div className="space-y-24">
              {/* 1. JOB OPENINGS SECTION */}
              <div className="space-y-8">
                <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-white/5 pb-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.15)] border border-brand-blue/20">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">Full-Time Core Positions</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-sans mt-0.5">Permanent active positions for industry-hardened professionals.</p>
                  </div>
                  <span className="ml-auto px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold font-mono">
                    {jobsList.length}
                  </span>
                </div>
                
                {jobsList.length === 0 ? (
                  <div className="p-16 text-center bg-slate-50/50 dark:bg-white/[0.01] rounded-3xl border border-dashed border-slate-200 dark:border-white/5 text-sm text-slate-400 dark:text-slate-500 font-medium">
                    No active job openings in this department. Check out our internship listings below!
                  </div>
                ) : (
                  <div className="space-y-6">
                    {jobsList.map((pos, idx) => (
                      <motion.div 
                        key={pos._id || idx} 
                        initial={{ opacity: 0, y: 15 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: idx * 0.05 }}
                        className="p-8 rounded-3xl border border-slate-200/80 dark:border-white/5 flex flex-col justify-between items-stretch gap-6 hover:border-brand-blue/40 dark:hover:border-brand-blue/40 transition-all duration-300 group bg-white/70 dark:bg-[#070914] shadow-sm hover:shadow-[0_0_30px_rgba(37,99,235,0.08)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue rounded-r-full transform -translate-x-1 transition-transform group-hover:translate-x-0" />
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-accent transition-colors tracking-tight font-heading">{pos.title}</h4>
                              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active
                              </div>
                              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-lg">[JOB-{String(idx + 1).padStart(2, '0')}]</span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-mono">
                              <span className="flex items-center gap-1.5"><Briefcase size={12} className="text-brand-blue" /> {pos.type}</span>
                              <span className="text-slate-300 dark:text-white/10">•</span>
                              <span className="flex items-center gap-1.5"><Globe size={12} className="text-brand-blue" /> {pos.location}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleApplyClick(pos.title)}
                            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-brand-blue dark:bg-white/5 text-slate-700 dark:text-white hover:text-white transition-all text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0 shadow-sm"
                          >
                            Apply for Role <ArrowRight size={14} />
                          </button>
                        </div>
                        
                        {pos.description && (
                          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-[#04060b]/60 p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 whitespace-pre-wrap font-sans relative z-10">
                            {pos.description}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. INTERNSHIPS SECTION */}
              <div className="space-y-8">
                <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-white/5 pb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)] border border-purple-500/20">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">Product Internship Roles</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-sans mt-0.5">High-momentum building programs for high-potential crafts-learners.</p>
                  </div>
                  <span className="ml-auto px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold font-mono">
                    {internsList.length}
                  </span>
                </div>
                
                {internsList.length === 0 ? (
                  <div className="p-16 text-center bg-slate-50/50 dark:bg-white/[0.01] rounded-3xl border border-dashed border-slate-200 dark:border-white/5 text-sm text-slate-400 dark:text-slate-500 font-medium">
                    No internship opportunities listed in this department right now. Check back soon!
                  </div>
                ) : (
                  <div className="space-y-6">
                    {internsList.map((pos, idx) => (
                      <motion.div 
                        key={pos._id || idx} 
                        initial={{ opacity: 0, y: 15 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: idx * 0.05 }}
                        className="p-8 rounded-3xl border border-slate-200/80 dark:border-white/5 flex flex-col justify-between items-stretch gap-6 hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all duration-300 group bg-white/70 dark:bg-[#070914] shadow-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-2 h-full bg-purple-500 rounded-r-full transform -translate-x-1 transition-transform group-hover:translate-x-0" />
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors tracking-tight font-heading">{pos.title}</h4>
                              <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                Active
                              </div>
                              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-lg">[INT-{String(idx + 1).padStart(2, '0')}]</span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-mono">
                              <span className="flex items-center gap-1.5"><GraduationCap size={12} className="text-purple-500" /> {pos.type}</span>
                              <span className="text-slate-300 dark:text-white/10">•</span>
                              <span className="flex items-center gap-1.5"><Globe size={12} className="text-purple-500" /> {pos.location}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleApplyClick(pos.title)}
                            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-purple-500 dark:bg-white/5 text-slate-700 dark:text-white hover:text-white transition-all text-xs font-bold uppercase tracking-widest font-mono flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0 shadow-sm"
                          >
                            Apply for Role <ArrowRight size={14} />
                          </button>
                        </div>
                        
                        {pos.description && (
                          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-[#04060b]/60 p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 whitespace-pre-wrap font-sans relative z-10">
                            {pos.description}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Application Modal Form */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-[#070914] border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>

              {isAuthLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-brand-blue animate-spin mb-4" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Checking candidate session...</p>
                </div>
              ) : isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center border border-green-500/20 bg-green-500/5 rounded-2xl">
                  <div className="w-16 h-16 mx-auto bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-3">Application Submitted!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mb-6 px-4">Thank you for applying to Nooraxis. We have successfully received your details and our recruitment team will review them shortly.</p>
                  <button onClick={() => { setIsSuccess(false); setIsApplyModalOpen(false); }} className="px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-medium text-sm transition-colors cursor-pointer font-mono font-bold uppercase tracking-wider">
                    Close Window
                  </button>
                </motion.div>
              ) : candidate === null ? (
                <div>
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-2 text-slate-900 dark:text-white tracking-tight">Candidate Portal</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Please sign in or create an account to submit your application for <span className="font-semibold text-brand-blue">{selectedPosition}</span>.</p>
                  </div>

                  <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl mb-6 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={() => { setAuthTab("register"); setAuthError(""); }}
                      className={`flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider font-mono rounded-lg transition-all cursor-pointer ${
                        authTab === "register"
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                      }`}
                    >
                      Create Account
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAuthTab("login"); setAuthError(""); }}
                      className={`flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider font-mono rounded-lg transition-all cursor-pointer ${
                        authTab === "login"
                          ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                      }`}
                    >
                      Sign In
                    </button>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-5 max-w-md mx-auto">
                    {authError && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                        {authError}
                      </div>
                    )}

                    {authTab === "register" && (
                      <div className="space-y-1.5">
                        <label className={labelCls}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Doe"
                          className={inputCls}
                        />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className={labelCls}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className={inputCls}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={labelCls}>Password *</label>
                      <input
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        className={inputCls}
                        minLength={6}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={authSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-purple-500 text-white font-bold text-xs uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2"
                    >
                      {authSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : authTab === "register" ? (
                        "Register & Continue"
                      ) : (
                        "Sign In & Continue"
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="mb-6 pr-8">
                    <h2 className="text-3xl font-heading font-bold mb-2 text-slate-900 dark:text-white tracking-tight">Submit Your Application</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Apply for the selected position below. Our hiring team will review your application and respond shortly.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 mb-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/20 gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                      <span className="font-sans text-xs">
                        Applying as <span className="font-bold text-slate-900 dark:text-white">{candidate.name}</span> ({candidate.email})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="text-xs text-red-500 hover:text-red-400 font-bold font-mono uppercase tracking-wider cursor-pointer flex items-center gap-1 hover:underline self-start sm:self-auto"
                    >
                      <LogOut size={12} /> [ Sign Out ]
                    </button>
                  </div>

                  <form ref={formRef} onSubmit={async (e) => {
                    await handleSubmit(e);
                  }} className="space-y-5">
                    {error && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className={labelCls}>Full Name *</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="name" 
                            required 
                            value={candidate.name} 
                            readOnly 
                            className={`${inputCls} bg-slate-100/50 dark:bg-white/5 cursor-not-allowed pr-10 text-slate-500 dark:text-slate-400`} 
                          />
                          <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelCls}>Email Address *</label>
                        <div className="relative">
                          <input 
                            type="email" 
                            name="email" 
                            required 
                            value={candidate.email} 
                            readOnly 
                            className={`${inputCls} bg-slate-100/50 dark:bg-white/5 cursor-not-allowed pr-10 text-slate-500 dark:text-slate-400`} 
                          />
                          <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className={labelCls}>Phone Number *</label>
                        <input type="tel" name="phone" required placeholder="+91 9876543210" className={inputCls} />
                      </div>
                      <div className="space-y-1.5">
                        <label className={labelCls}>Position Applying For</label>
                        <div className="relative">
                          <select 
                            name="position" 
                            value={selectedPosition} 
                            onChange={(e) => setSelectedPosition(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#070914] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-brand-blue transition-colors appearance-none cursor-pointer"
                          >
                            <option value="General Application">General Application</option>
                            {positions.map(p => <option key={p._id || p.title} value={p.title}>{p.title}</option>)}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelCls}>Portfolio / LinkedIn URL</label>
                      <input type="url" name="portfolio_url" placeholder="https://linkedin.com/in/johndoe" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelCls}>Resume/CV Link (Google Drive, Dropbox, etc.) *</label>
                      <input type="url" name="resume_url" required placeholder="Paste a link to your resume" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelCls}>Cover Letter / Message</label>
                      <textarea name="message" rows={4} placeholder="Tell us why you'd be a great fit for Nooraxis..." className={`${inputCls} resize-none`} />
                    </div>
                    <button type="submit" disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue to-purple-500 text-white font-bold text-xs uppercase tracking-widest font-mono shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>Submit Application <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                      )}
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-3 font-sans">By submitting, you agree to our Privacy Policy regarding data collection.</p>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
