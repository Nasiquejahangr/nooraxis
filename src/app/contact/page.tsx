"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  Navigation,
} from "lucide-react";
import { useState } from "react";
import Interactive3DTexture from "@/components/Interactive3DTexture";
import { useSettings } from "@/components/SettingsProvider";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "Web Development",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { settings } = useSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "Web Development",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  } as const;

  return (
    <div className="flex flex-col w-full overflow-hidden tech-grid min-h-screen">
      {/* Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-6 md:pt-12 pb-20 px-6 overflow-hidden">
        {/* Interactive 3D Mesh Particle Grid */}
        <Interactive3DTexture />

        {/* Subtle mesh background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-brand-accent/10 dark:bg-brand-accent/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-brand-blue/5 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-accent mb-6 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={13} className="text-brand-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase">
              Interactive Channels
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white"
          >
            Get in <span className="text-gradient">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Formulate your software ideas. Reach out to our architects to
            discuss your technical parameters and budget pipelines.
          </motion.p>
        </div>
      </section>

      {/* Main Form Dashboard */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info Cards & Location */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="glass-dark border border-gray-200 dark:border-white/5 rounded-3xl p-8 bg-white/60 dark:bg-[#03050c]/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/5 rounded-full blur-[40px] pointer-events-none" />
                <h3 className="text-xl font-heading font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <Navigation
                    size={18}
                    className="text-brand-accent animate-pulse"
                  />{" "}
                  Contact Directory
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email Correspondence",
                      value: settings?.email || "nasiquejahangir000@gmail.com",
                      href: `mailto:${settings?.email || "nasiquejahangir000@gmail.com"}`,
                    },
                    {
                      icon: Phone,
                      label: "Direct Phone Link",
                      value: settings?.phone || "+91 9508904653",
                      href: `tel:${(settings?.phone || "+91 9508904653").replace(/\s+/g, "")}`,
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 dark:bg-brand-blue/15 flex items-center justify-center text-brand-blue dark:text-brand-accent shrink-0 border border-brand-blue/10">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                          {label}
                        </h4>
                        <a
                          href={href}
                          className="text-sm font-semibold text-gray-800 dark:text-gray-300 hover:text-brand-accent transition-colors"
                        >
                          {value}
                        </a>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-4 pt-2 border-t border-black/5 dark:border-white/5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 dark:bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0 border border-brand-accent/10">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        HQ Physical Location
                      </h4>
                      <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed font-semibold">
                        {settings?.address || "Madhopara, Islam Nagar, Purnia"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map block details */}
              <div className="w-full h-64 rounded-3xl overflow-hidden border border-gray-250 dark:border-white/5 flex items-center justify-center relative bg-gray-50 dark:bg-[#03050c]/60 backdrop-blur-md shadow-sm group">
                <div className="absolute inset-0 bg-brand-blue/5 opacity-40 pointer-events-none group-hover:scale-105 duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-accent/10 rounded-full blur-[50px] pointer-events-none" />

                <div className="z-10 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-accent flex items-center justify-center mx-auto border border-brand-blue/20 shadow-md">
                    <MapPin size={20} className="animate-bounce" />
                  </div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-300 uppercase tracking-wider">
                    Coordinates Calibrated
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    Purnia, Bihar (India)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Form Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-white/5 relative overflow-hidden bg-white/60 dark:bg-[#03050c]/40 backdrop-blur-md">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 dark:bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none animate-pulse" />

                <h3 className="text-2xl font-heading font-extrabold mb-6 relative z-10 text-gray-900 dark:text-white tracking-tight">
                  Send Enquiry
                </h3>

                <form
                  className="relative z-10 space-y-5"
                  onSubmit={handleSubmit}
                >
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                        disabled={isSubmitting}
                        className="w-full bg-gray-50/50 dark:bg-[#050816]/60 border border-gray-200 dark:border-white/5 rounded-xl px-4.5 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-brand-blue dark:focus:border-brand-accent focus:ring-4 focus:ring-brand-blue/10 dark:focus:ring-brand-accent/5 transition-all disabled:opacity-50 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                        disabled={isSubmitting}
                        className="w-full bg-gray-50/50 dark:bg-[#050816]/60 border border-gray-200 dark:border-white/5 rounded-xl px-4.5 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-brand-blue dark:focus:border-brand-accent focus:ring-4 focus:ring-brand-blue/10 dark:focus:ring-brand-accent/5 transition-all disabled:opacity-50 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-50/50 dark:bg-[#050816]/60 border border-gray-200 dark:border-white/5 rounded-xl px-4.5 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-brand-blue dark:focus:border-brand-accent focus:ring-4 focus:ring-brand-blue/10 dark:focus:ring-brand-accent/5 transition-all disabled:opacity-50 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      disabled={isSubmitting}
                      className="w-full bg-gray-50/50 dark:bg-[#050816]/60 border border-gray-200 dark:border-white/5 rounded-xl px-4.5 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-brand-blue dark:focus:border-brand-accent focus:ring-4 focus:ring-brand-blue/10 dark:focus:ring-brand-accent/5 transition-all disabled:opacity-50 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Scope of Work
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      disabled={isSubmitting}
                      className="w-full bg-gray-50/50 dark:bg-[#050816]/60 border border-gray-200 dark:border-white/5 rounded-xl px-4.5 py-3 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:border-brand-blue dark:focus:border-brand-accent focus:ring-4 focus:ring-brand-blue/10 dark:focus:ring-brand-accent/5 transition-all appearance-none disabled:opacity-50 font-semibold"
                    >
                      <option>Web Development</option>
                      <option>Software Development</option>
                      <option>Digital Marketing</option>
                      <option>UI/UX Design</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Project Brief
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Outline system parameters or operational deadlines..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-50/50 dark:bg-[#050816]/60 border border-gray-200 dark:border-white/5 rounded-xl px-4.5 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-brand-blue dark:focus:border-brand-accent focus:ring-4 focus:ring-brand-blue/10 dark:focus:ring-brand-accent/5 transition-all resize-none disabled:opacity-50 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />{" "}
                        Transmitting parameters...
                      </>
                    ) : (
                      <>
                        Submit Enquiry{" "}
                        <Send
                          size={15}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* Success Portal Overlay */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-white/95 dark:bg-[#03050c]/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="w-16 h-16 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6 border border-green-500/20 shadow-lg shadow-green-500/10"
                      >
                        <CheckCircle2 size={36} />
                      </motion.div>
                      <h4 className="text-xl font-heading font-extrabold mb-2 text-gray-900 dark:text-white">
                        Parameters Received!
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs max-w-sm mb-8 leading-relaxed font-semibold">
                        Thank you for reaching out. We have logged your enquiry
                        in our operations queue and our engineering team will
                        get back to you shortly.
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-brand-dark font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                      >
                        Submit Another
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile SLA Link */}
                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-center">
                  <p className="text-xs text-gray-500 mb-4 font-semibold">
                    Prefer instant voice consultation?
                  </p>
                  <a
                    href="https://wa.me/919508904653"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20 text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    <MessageCircle size={16} /> WhatsApp Live Link
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
