"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Copy, Check, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import Interactive3DTexture from "@/components/Interactive3DTexture";
import { STATIC_FALLBACK_POSTS, BlogPost } from "@/data/blogData";

// Custom high-fidelity brand SVGs for Twitter/X and LinkedIn to ensure 100% type safety and version compatibility
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // Track scrolling depth for progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!id) return;

    async function loadArticle() {
      try {
        setIsLoading(true);
        
        let fetchedPost: BlogPost | null = null;
        
        // 1. Try to fetch from API (resolves both ObjectID and custom slug)
        try {
          const res = await fetch(`/api/blog/${id}`);
          if (res.ok) {
            fetchedPost = await res.json();
          }
        } catch (apiErr) {
          console.warn("API fetch failed, falling back to static dataset:", apiErr);
        }

        // 2. If not found in DB, check static fallbacks
        if (!fetchedPost) {
          const fallback = STATIC_FALLBACK_POSTS.find(
            (p) => p.slug === id || p._id === id || p.slug.toLowerCase() === id.toLowerCase()
          );
          if (fallback) {
            fetchedPost = fallback;
          }
        }

        if (fetchedPost) {
          setPost(fetchedPost);
          
          // Determine related posts (exclude current, matching category or featured)
          const currentPost = fetchedPost;
          const filteredRelated = STATIC_FALLBACK_POSTS.filter(
            (p) => p.slug !== currentPost.slug && p._id !== currentPost._id
          )
            .sort((a, b) => {
              if (a.category === currentPost.category && b.category !== currentPost.category) return -1;
              if (b.category === currentPost.category && a.category !== currentPost.category) return 1;
              return 0;
            })
            .slice(0, 3);
          
          setRelatedPosts(filteredRelated);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Failed to load article details.", err);
        // Fallback search
        const fallback = STATIC_FALLBACK_POSTS.find(
          (p) => p.slug === id || p._id === id || p.slug.toLowerCase() === id.toLowerCase()
        );
        if (fallback) {
          setPost(fallback);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [id]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    if (typeof window !== "undefined" && post) {
      const text = encodeURIComponent(`Check out "${post.title}" by ${post.author} on Nooraxis!`);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  const shareOnLinkedIn = () => {
    if (typeof window !== "undefined" && post) {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center tech-grid pt-24 px-6 bg-background">
        <div className="w-12 h-12 rounded-full border-2 border-brand-blue/30 border-t-brand-blue animate-spin" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Retrieving Publication...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center tech-grid px-6 bg-background">
        <div className="text-center max-w-md p-10 glass-dark border border-gray-200 dark:border-white/5 rounded-3xl shadow-xl">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6 stroke-[1.5]" />
          <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg mb-2">Article Not Found</h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-6">
            The publication you are looking for does not exist or may have been archived.
          </p>
          <button
            onClick={() => router.push("/blog")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-brand-blue text-white rounded-xl shadow-md shadow-brand-blue/15 hover:bg-brand-blue/90 transition-all"
          >
            <ArrowLeft size={14} /> Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen tech-grid relative pb-32">
      {/* Scroll-linked reading progress bar */}
      <motion.div
        className="fixed top-[61px] md:top-[73px] lg:top-[85px] left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue via-brand-accent to-indigo-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <Interactive3DTexture />

      {/* Hero Header Context */}
      <div className="container mx-auto px-6 max-w-4xl pt-8 md:pt-16 pb-12 relative z-10">
        {/* Navigation back and quick breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-brand-blue dark:text-gray-400 dark:hover:text-white transition-all group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
          <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-blue dark:text-brand-accent px-2 py-0.5 rounded bg-brand-blue/5 border border-brand-blue/10">
            {post.category}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        {/* Author Bio Deck */}
        <div className="flex items-center gap-4 py-6 border-y border-gray-200/60 dark:border-white/5 bg-white/40 dark:bg-black/10 backdrop-blur-md px-6 rounded-3xl shadow-sm">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-blue to-brand-accent flex items-center justify-center text-white font-heading font-extrabold text-sm border-2 border-white dark:border-brand-black shadow-md shrink-0">
            {post.authorAvatar || "UX"}
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1.5">{post.author}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-none font-semibold">{post.authorRole || "Technical Writer"}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-right shrink-0">
            <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase"><Calendar size={12} /> {post.date}</span>
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-gray-400 uppercase"><Clock size={12} /> {post.readTime || "5 MIN READ"}</span>
          </div>
        </div>
      </div>

      {/* Main Cover Visual */}
      <div className="container mx-auto px-6 max-w-4xl pb-16 relative z-10">
        <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] relative rounded-3xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-white/5 bg-slate-900 flex items-center justify-center">
          {post.image && post.image.startsWith("bg-") ? (
            <div className={`absolute inset-0 ${post.image}`} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-2 pointer-events-none p-6 text-center">
            <Sparkles size={40} className="text-white/20 mb-1" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/55">NOORAXIS ENGINEERING JOURNAL</span>
          </div>
        </div>
      </div>

      {/* Core Article Body Content Layout */}
      <div className="container mx-auto px-6 max-w-4xl relative z-10 flex flex-col lg:flex-row gap-12">
        {/* Floating sharing panel - desktop only */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit items-center w-12 pt-2 border-r border-gray-200/40 dark:border-white/5 pr-6">
          <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest vertical-text mb-4">SHARE</span>
          
          <button
            onClick={handleCopyLink}
            title="Copy Article Link"
            className="p-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white transition-all shadow-sm"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>

          <button
            onClick={shareOnTwitter}
            title="Share on Twitter/X"
            className="p-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white transition-all shadow-sm flex items-center justify-center"
          >
            <TwitterIcon className="w-4 h-4" />
          </button>

          <button
            onClick={shareOnLinkedIn}
            title="Share on LinkedIn"
            className="p-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white transition-all shadow-sm flex items-center justify-center"
          >
            <LinkedinIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Article Body */}
        <article className="flex-grow max-w-2xl">
          <div 
            className="prose-custom w-full"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Social share toolbar for mobile/small screens */}
          <div className="mt-12 pt-8 border-t border-gray-200/60 dark:border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:hidden">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Share2 size={14} className="text-brand-blue dark:text-brand-accent" /> Share this publication
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 transition-all"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-500" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy Link
                  </>
                )}
              </button>
              
              <button
                onClick={shareOnTwitter}
                className="p-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-300 transition-all flex items-center justify-center"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={shareOnLinkedIn}
                className="p-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-300 transition-all flex items-center justify-center"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Related articles footer slider */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-6 max-w-4xl mt-24 pt-16 border-t border-gray-200/60 dark:border-white/5 relative z-10">
          <h4 className="font-heading font-extrabold text-xl text-gray-900 dark:text-white mb-8">Related Publications</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, idx) => (
              <Link 
                key={relatedPost.slug || idx} 
                href={relatedPost._id ? `/blog/${relatedPost._id}` : `/blog/${relatedPost.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200/60 dark:border-white/5 bg-white/40 dark:bg-black/20 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 p-5 transition-all shadow-sm duration-300"
              >
                <span className="text-[8px] font-bold text-brand-blue dark:text-brand-accent uppercase tracking-wider mb-2">{relatedPost.category}</span>
                <h5 className="font-heading font-bold text-sm text-gray-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-accent transition-colors line-clamp-2 leading-snug mb-3">
                  {relatedPost.title}
                </h5>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed font-semibold">
                  {relatedPost.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between text-[9px] text-gray-400 font-bold uppercase">
                  <span>{relatedPost.author}</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Styled custom CSS embedded specifically for the readability article */}
      <style jsx global>{`
        .prose-custom p {
          font-family: var(--font-inter), sans-serif;
          font-size: 1rem;
          line-height: 1.85;
          margin-bottom: 1.5rem;
          color: #374151; /* light mode text-gray-700 */
        }
        .dark .prose-custom p {
          color: #d1d5db; /* dark mode text-gray-300 */
        }
        .prose-custom p.lead {
          font-size: 1.125rem;
          line-height: 1.8;
          font-weight: 500;
          color: #111827;
        }
        .dark .prose-custom p.lead {
          color: #f9fafb;
        }
        .prose-custom h2 {
          font-family: var(--font-poppins), sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
          color: #111827;
        }
        .dark .prose-custom h2 {
          color: #ffffff;
        }
        .prose-custom h3 {
          font-family: var(--font-poppins), sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
        }
        .dark .prose-custom h3 {
          color: #ffffff;
        }
        .prose-custom blockquote {
          position: relative;
          padding-left: 1.5rem;
          margin: 2rem 0;
          border-left: 3px solid #2563EB; /* brand-blue */
          font-style: italic;
          font-size: 1.125rem;
          font-weight: 500;
          color: #1f2937;
        }
        .dark .prose-custom blockquote {
          border-left-color: #3B82F6; /* brand-accent */
          color: #f3f4f6;
        }
        .prose-custom ul {
          list-style-type: none;
          padding-left: 0.5rem;
          margin-bottom: 1.75rem;
        }
        .prose-custom li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #374151;
        }
        .dark .prose-custom li {
          color: #d1d5db;
        }
        .prose-custom li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: #2563EB;
          font-weight: 800;
        }
        .dark .prose-custom li::before {
          color: #3B82F6;
        }
        .prose-custom pre {
          background-color: #1e293b; /* slate-800 */
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.25rem;
          border-radius: 1rem;
          overflow-x: auto;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .prose-custom code {
          font-family: monospace;
          font-size: 0.85rem;
          color: #38bdf8; /* sky-400 */
        }
        .prose-custom p code {
          background-color: #f1f5f9;
          color: #ef4444; /* red-500 */
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-size: 0.825rem;
          border: 1px solid #e2e8f0;
        }
        .dark .prose-custom p code {
          background-color: rgba(255, 255, 255, 0.05);
          color: #f87171; /* red-400 */
          border-color: rgba(255, 255, 255, 0.1);
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
