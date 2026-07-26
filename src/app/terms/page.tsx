"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  FileText,
  ShieldAlert,
  Sparkles,
  Scale,
  Info,
} from "lucide-react";
import Link from "next/link";
import Interactive3DTexture from "@/components/Interactive3DTexture";
import { useSettings } from "@/components/SettingsProvider";

const createSections = (settings?: { email?: string }) => [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    subtitle: "Legal agreement and binding compliance",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          By accessing, browsing, or using Nooraxis Technologies' website,
          applications, and professional digital services, you acknowledge that
          you have read, understood, and agree to be bound by these Terms of
          Service, all applicable laws, and regulations.
        </p>
        <p className="leading-relaxed">
          If you do not agree with any of these terms, you are prohibited from
          using or accessing this site. The materials contained in this website
          are protected by applicable copyright and trademark laws.
        </p>
        <div className="mt-6 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/5 text-amber-600 dark:text-amber-400 text-sm flex items-start gap-4 shadow-sm backdrop-blur-md">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <ShieldAlert size={18} />
          </div>
          <div>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 inline-block mb-1.5">
              IMPORTANT NOTICE
            </span>
            <p className="leading-relaxed m-0 text-sm text-gray-700 dark:text-gray-300">
              Please read these terms carefully. They contain critical
              parameters about your legal rights, engineering obligations, and
              liabilities, including class action waivers.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "services",
    title: "2. Services & Scope",
    subtitle: "Solutions portfolio and delivery boundaries",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          Nooraxis Technologies is a premium provider of advanced digital
          solutions, specializing in custom website engineering, complex SaaS
          platform development, brand strategy, graphic design, search engine
          optimization (SEO), and digital marketing funnels.
        </p>
        <p className="mb-4 leading-relaxed">
          We reserve the right to modify, update, suspend, or discontinue any
          aspect of our services (temporarily or permanently) with or without
          prior notice. As a client, you agree that Nooraxis Technologies shall
          not be liable to you or any third party for any modification, price
          change, suspension, or discontinuance of the service.
        </p>
        <div className="p-5 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 text-sm space-y-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-brand-blue/10 text-brand-blue dark:text-brand-accent">
              <Sparkles size={14} />
            </span>
            <span className="font-mono text-xs font-semibold text-brand-blue dark:text-brand-accent tracking-widest uppercase block">
              Service Standards
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0 text-sm">
            Our engineering teams adhere strictly to modern architectural
            guidelines, ensuring clean component trees, fully responsive bento
            grid interfaces, and optimized canvas execution structures.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "intellectual",
    title: "3. Intellectual Property Rights",
    subtitle: "Ownership parameters and usage guidelines",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          All original code, custom animations, design boards, typography files,
          images, branding portfolios, and database models developed by Nooraxis
          Technologies remain the sole intellectual property of Nooraxis
          Technologies until full project clearance and official billing
          transfer occurs.
        </p>
        <p className="leading-relaxed">
          Unauthorized reproduction, compilation, mirroring, or distribution of
          our source files, layout architectures, or proprietary 3D rendering
          loops is strictly prohibited without explicit written consent from
          Nooraxis Technologies.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "4. Limitation of Liability",
    subtitle: "Operational guarantees and risk definitions",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          To the maximum extent permitted by law, Nooraxis Technologies, its
          directors, engineers, partners, and affiliates shall not be liable for
          any direct, indirect, incidental, special, or consequential damages
          resulting from the use or inability to use our systems, cloud servers,
          or marketing funnels.
        </p>
        <p className="leading-relaxed">
          This includes but is not limited to: loss of profits, transactional
          discrepancies, server down-times, third-party plugin deprecations, or
          data leaks. You assume full operational responsibility for all
          deployments post-handover.
        </p>
      </>
    ),
  },
  {
    id: "governing",
    title: "5. Governing Law & Jurisdiction",
    subtitle: "Legal framework and dispute coordinates",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          These Terms of Service, along with any separate agreements whereby we
          provide you services, shall be governed by and construed in accordance
          with the laws of the jurisdiction in which Nooraxis Technologies
          operates, without regard to its conflict of law provisions.
        </p>
        <p className="leading-relaxed">
          Any legal action, suit, or proceeding arising out of or relating to
          these Terms shall be instituted exclusively in the relevant courts of
          the jurisdiction, and you consent to the personal jurisdiction of such
          courts.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "6. Contact & Support Information",
    subtitle: "Enquiries and administrative assistance",
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          If you have any questions, inquiries, or require formal clarification
          regarding these Terms of Service, please reach out directly to our
          legal team.
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

export default function TermsOfService() {
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
            <Scale size={13} className="animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase font-mono">
              Compliance Registry
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white"
          >
            Terms of <span className="text-gradient">Service</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Please review our operational guidelines, intellectual property
            scopes, and engineering frameworks outlining the parameters of
            Nooraxis digital delivery.
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
                      {section.id === "acceptance"
                        ? "1"
                        : section.id === "services"
                          ? "2"
                          : section.id === "intellectual"
                            ? "3"
                            : section.id === "liability"
                              ? "4"
                              : section.id === "governing"
                                ? "5"
                                : "6"}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      NOOR-REF // {section.id.toUpperCase()}
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
