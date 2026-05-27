"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Clock, Sparkles, Search, SlidersHorizontal, BookOpenCheck } from "lucide-react";
import Link from "next/link";
import Interactive3DTexture from "@/components/Interactive3DTexture";
import { STATIC_FALLBACK_POSTS, BlogPost } from "@/data/blogData";

const CATEGORIES = ["All", "Technology", "Engineering", "Design", "Business", "Marketing", "Branding"];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data);
          } else {
            setPosts(STATIC_FALLBACK_POSTS);
          }
        } else {
          setPosts(STATIC_FALLBACK_POSTS);
        }
      } catch (err) {
        console.error("Failed to load blog posts, using fallback data.", err);
        setPosts(STATIC_FALLBACK_POSTS);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Filter posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Render all posts in the standard card grid format
  const gridPosts = filteredPosts;

  const getPostLink = (post: BlogPost) => {
    return post.slug ? `/blog/${post.slug}` : `/blog/${post._id}`;
  };

  return (
    <div className="flex flex-col w-full overflow-hidden tech-grid min-h-screen">
      {/* Premium Header */}
      <section className="relative min-h-[40vh] md:min-h-[45vh] flex items-center justify-center pt-8 md:pt-14 pb-16 px-6 overflow-hidden">
        {/* Interactive 3D Mesh Particle Grid */}
        <Interactive3DTexture />

        {/* Subtle mesh background blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-brand-blue/10 dark:bg-brand-blue/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-brand-accent/10 dark:bg-brand-accent/15 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/5 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 text-brand-blue dark:text-brand-accent mb-6 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={13} className="text-brand-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Nooraxis Publishing</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-5 text-gray-900 dark:text-white"
          >
            Insights & <span className="text-gradient">Innovations</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Stay up to date with engineering briefs, design principles, and cloud architectures compiled by our system strategists.
          </motion.p>
        </div>
      </section>

      {/* Interactive Toolbar: Search & Category Navigation */}
      <section className="relative z-20 -mt-8 pb-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="glass-dark border border-gray-200/80 dark:border-white/5 rounded-3xl p-6 shadow-xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue dark:group-focus-within:text-brand-accent transition-colors" />
              <input
                type="text"
                placeholder="Search articles, categories, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-blue dark:focus:border-brand-accent focus:ring-1 focus:ring-brand-blue dark:focus:ring-brand-accent transition-all font-medium"
              />
            </div>

            {/* Category selection */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
              <SlidersHorizontal size={14} className="text-gray-400 shrink-0 hidden md:block" />
              <div className="flex gap-2 shrink-0">
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-brand-blue dark:bg-white text-white dark:text-black shadow-md shadow-brand-blue/10"
                          : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory Output */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          {isLoading ? (
            /* Loading State Skeletons */
            <div className="space-y-12">
              <div className="border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row bg-white dark:bg-white/5 animate-pulse h-96">
                <div className="w-full md:w-1/2 h-full bg-gray-200 dark:bg-white/5" />
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4" />
                  <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-3/4 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-5/6" />
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/3 pt-4" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 animate-pulse overflow-hidden h-[380px] flex flex-col">
                    <div className="h-48 w-full bg-gray-200 dark:bg-white/5" />
                    <div className="p-6 flex-grow space-y-4">
                      <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-3/4 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full" />
                        <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-5/6" />
                      </div>
                      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2 pt-4 mt-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            /* Empty State */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 glass-dark border border-gray-200 dark:border-white/5 rounded-3xl p-10 max-w-lg mx-auto shadow-md"
            >
              <BookOpenCheck className="w-16 h-16 text-gray-400 mx-auto mb-6 stroke-[1.5]" />
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg mb-2">No publications found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any articles matching your search query or selected category. Try selecting another filter or clear the search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 px-5 py-2.5 text-xs font-semibold bg-brand-blue text-white rounded-xl shadow-md shadow-brand-blue/15 hover:bg-brand-blue/90 transition-all"
              >
                Clear Search & Filters
              </button>
            </motion.div>
          ) : (
            /* Grid and Featured Render */
            <div className="space-y-12">
              <AnimatePresence mode="popLayout">
                {/* 2. Grid Articles Output */}
                {gridPosts.length > 0 && (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
                  >
                    {gridPosts.map((post, idx) => (
                      <motion.div 
                        key={post._id || post.slug || idx} 
                        layout
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="group rounded-3xl overflow-hidden border border-gray-200/80 dark:border-white/5 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 flex flex-col transition-all duration-300 h-full bg-white/60 dark:bg-black/30 backdrop-blur-md shadow-sm hover:shadow-md"
                      >
                        {/* Card Image Block */}
                        <div className="h-48 w-full relative overflow-hidden bg-slate-900 flex items-center justify-center border-b border-black/5 dark:border-white/5">
                          {post.image && post.image.startsWith("bg-") ? (
                            <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${post.image}`} />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          )}
                          
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-colors z-10 pointer-events-none" />
                          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-bold text-white uppercase tracking-wider border border-white/10 z-10">
                            {post.category}
                          </div>
                        </div>

                        {/* Card Content Details */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-base font-heading font-extrabold mb-3 text-gray-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-accent transition-colors line-clamp-2 leading-snug">
                            <Link href={getPostLink(post)}>
                              {post.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 text-xs mb-6 flex-grow line-clamp-3 leading-relaxed font-semibold">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5 text-[10px] text-gray-500 font-bold">
                            <span className="flex items-center gap-1.5"><User size={13} className="text-brand-blue dark:text-brand-accent" /> {post.author}</span>
                            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime || "5 MIN"}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
