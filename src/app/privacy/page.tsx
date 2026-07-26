"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Eye,
  Database,
  Key,
  Cookie,
  Info,
} from "lucide-react";
import Link from "next/link";
import Interactive3DTexture from "@/components/Interactive3DTexture";
import { useSettings } from "@/components/SettingsProvider";

const createSections = (settings?: { email?: string } | null) => [
  {
    id: "collect",
    title: "1. Data Acquisition Profile",
    subtitle: "Acquisition coordinates and collection scopes",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          Nooraxis Technologies values your operational privacy and commits to
          safeguarding your identity markers. We collect specific data points
          that you transfer directly to us when navigating our website, filling
          contact interfaces, or engaging in collaborative software deployments.
        </p>
        <p className="mb-4 leading-relaxed">
          This includes the following primary metadata sets:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4.5 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/2">
            <span className="font-mono text-xs text-brand-blue dark:text-brand-accent uppercase block mb-1">
              Identity Tokens
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 m-0 leading-relaxed">
              Full legal name, official business email addresses, contact
              telephone numbers, and corporate titles.
            </p>
          </div>
          <div className="p-4.5 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/2">
            <span className="font-mono text-xs text-brand-blue dark:text-brand-accent uppercase block mb-1">
              Interactive Log Data
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 m-0 leading-relaxed">
              Client IP coordinates, localized browser signatures, page
              interactions, and timing trackers.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "usage",
    title: "2. Operational Data Utilization",
    subtitle: "Functional application of collected metadata",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          The acquired variables are synthesized to refine, maintain, and secure
          the Nooraxis digital framework. Specifically, your metrics are
          utilized to:
        </p>
        <ul className="space-y-3.5 pl-0 mt-6 mb-6">
          {[
            "Deploy, manage, and verify customized client-side software instances.",
            "Formulate and transmit critical technical notices, system patches, and security advisories.",
            "Evaluate conversion analytics and interface usability parameters to upgrade layout responses.",
            "Fulfill legislative and corporate compliance parameters governing network integrity.",
          ].map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
            >
              <span className="w-5 h-5 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-accent flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "3. Metadata Distribution Scopes",
    subtitle: "Sharing restrictions and boundary guidelines",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          Nooraxis Technologies enforces a strict zero-distribution threshold.
          We do not sell, trade, rent, or lease your personal identity tokens or
          data arrays to third-party marketing entities.
        </p>
        <p className="leading-relaxed">
          Aggregate, non-identifying diagnostic data points may occasionally be
          compiled to improve our global server latency or CDN caching
          configurations, shared exclusively with verified infrastructure
          partners who operate under active NDAs.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "4. Cryptographic Safeguards",
    subtitle: "Network encryption and storage parameters",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          All data operations within the Nooraxis workspace are encrypted in
          transit via Transport Layer Security (TLS 1.3) and protected at rest
          utilizing Advanced Encryption Standard (AES-256) parameters.
        </p>
        <div className="mt-6 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-sm flex items-start gap-4 shadow-sm backdrop-blur-md">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Key size={18} />
          </div>
          <div>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 inline-block mb-1.5">
              SECURITY SPECIFICATION
            </span>
            <p className="leading-relaxed m-0 text-sm text-gray-700 dark:text-gray-300">
              We periodically conduct vulnerability scanning and firewall
              testing to prevent unauthorized server penetration or interface
              injection vectors.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookie Declarations",
    subtitle: "Local device tracking and cache configurations",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          Our platform utilizes tiny client-side state files (cookies) to
          persist design configurations (such as dark-mode preference) and
          monitor standard traffic arrays.
        </p>
        <p className="leading-relaxed">
          You hold the complete operational capacity to disable or customize
          cookies through your native browser configuration interface, though
          doing so might affect certain animated rendering loops or interactive
          form persistence states.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "6. Directives & Enquiries",
    subtitle: "Data modification requests and legal desk",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          You retain full authority to request the extraction, modification, or
          absolute purging of your identity markers from our databases. If you
          wish to trigger a compliance request, please contact our legal desk
          directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="flex-1 p-5 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/2 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300">
            <span className="text-xs text-gray-500 font-mono block mb-1">
              EMAIL ADDRESS
            </span>
            <a
              href={`mailto:${settings?.email || "nasiquejahangir000@gmail.com"}`}
              className="text-brand-blue dark:text-brand-accent hover:underline font-semibold text-sm"
            >
              {settings?.email || "nasiquejahangir000@gmail.com"}
            </a>
          </div>
          <div className="flex-1 p-5 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/2 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300">
            <span className="text-xs text-gray-500 font-mono block mb-1">
              OFFICIAL PORTAL
            </span>
            <Link
              href="/contact"
              className="text-brand-blue dark:text-brand-accent hover:underline font-semibold text-sm flex items-center gap-1.5"
            >
              Contact Desk <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  const { settings } = useSettings();
  const SECTIONS = createSections(settings);

  return (
    <div className="flex flex-col w-full overflow-hidden tech-grid min-h-screen">
      {/* Premium Sub-Page Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-6 md:pt-12 pb-20 px-6 overflow-hidden">
        {/* Interactive 3D Mesh Particle Grid */}
        <Interactive3DTexture />

        {/* Subtle mesh background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] bg-brand-accent/10 dark:bg-brand-accent/15 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-7000" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-brand-blue/5 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-accent mb-6 shadow-sm backdrop-blur-md"
          >
            <ShieldCheck size={13} className="animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase font-mono">
              Encryption Standard
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white"
          >
            Privacy <span className="text-gradient">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Review our data safeguarding metrics, encryption layers, and
            collection coordinates defining Nooraxis' client relationship
            values.
          </motion.p>
        </div>
      </section>

      {/* Main Documentation Board */}
      <section className="py-20 bg-white dark:bg-[#050816]/30 relative transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <div className="space-y-16">
            {SECTIONS.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-mt-32 group"
              >
                <div className="p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/1 shadow-sm hover:shadow-[0_8px_30px_rgba(59,130,246,0.03)] hover:border-brand-blue/20 dark:hover:border-white/10 transition-all duration-500 relative overflow-hidden">
                  {/* Background light glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-750 pointer-events-none" />

                  <div className="flex items-center justify-between mb-4 border-b border-black/5 dark:border-white/5 pb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-blue dark:text-brand-accent bg-brand-blue/5 dark:bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/10">
                      Section 0
                      {section.id === "collect"
                        ? "1"
                        : section.id === "usage"
                          ? "2"
                          : section.id === "sharing"
                            ? "3"
                            : section.id === "security"
                              ? "4"
                              : section.id === "cookies"
                                ? "5"
                                : "6"}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      NOOR-SEC // {section.id.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-6">
                    {section.subtitle}
                  </p>

                  <div className="prose prose-invert max-w-none text-gray-600 dark:text-gray-300 text-base leading-relaxed space-y-4">
                    {section.content}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
