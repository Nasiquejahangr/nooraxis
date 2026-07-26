"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  LayoutGrid,
  Briefcase,
  BookOpen,
  Layers,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Code,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  Sparkles,
  Upload,
  GraduationCap,
  Phone,
  Copy,
  Check,
  Tag,
} from "lucide-react";
import { useTheme } from "next-themes";
import Interactive3DTexture from "@/components/Interactive3DTexture";
import { useSettings } from "@/components/SettingsProvider";

export default function AdminPanel() {
  const { resolvedTheme } = useTheme();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "portfolio"
    | "blog"
    | "jobs"
    | "enquiries"
    | "applications"
    | "offers"
  >("overview");

  // Loaded Data States
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);

  // Offers State
  const [offerText, setOfferText] = useState("");
  const [offerBtnText, setOfferBtnText] = useState("Call Now");
  const [offerBtnLink, setOfferBtnLink] = useState("tel:+919508904653");
  const [offerIsActive, setOfferIsActive] = useState(false);
  const [isSavingOffer, setIsSavingOffer] = useState(false);

  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyRegistrationDate, setCompanyRegistrationDate] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryImageUrl, setGalleryImageUrl] = useState("");
  const [isSavingCompanySettings, setIsSavingCompanySettings] = useState(false);

  // Loading indicators
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Clipboard copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    triggerNotification("success", "Resource ID copied to clipboard");
    setTimeout(() => setCopiedId(null), 1500);
  };

  const inputCls =
    "w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans";
  const labelCls =
    "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono";

  // Alert/Notification State
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // CRUD Modals State
  const [modalType, setModalType] = useState<
    "portfolio" | "blog" | "job" | null
  >(null);
  const [editItem, setEditItem] = useState<any | null>(null); // holds item being edited, else null for "create"

  // Modal Fields
  const [pTitle, setPTitle] = useState("");
  const [pCategory, setPCategory] = useState("Web App");
  const [pDesc, setPDesc] = useState("");
  const [pTags, setPTags] = useState("");
  const [pImage, setPImage] = useState(
    "bg-gradient-to-br from-indigo-900 to-slate-800",
  );
  const [pExternal, setPExternal] = useState("");
  const [pCode, setPCode] = useState("");

  const [bTitle, setBTitle] = useState("");
  const [bExcerpt, setBExcerpt] = useState("");
  const [bContent, setBContent] = useState("");
  const [bCategory, setBCategory] = useState("Technology");
  const [bAuthor, setBAuthor] = useState("Alex Morgan");
  const [bDate, setBDate] = useState("");
  const [bImage, setBImage] = useState(
    "bg-gradient-to-br from-blue-900 to-purple-900",
  );
  const [bFeatured, setBFeatured] = useState(false);
  const [bSlug, setBSlug] = useState("");
  const [bReadTime, setBReadTime] = useState("5 MIN READ");
  const [bAuthorRole, setBAuthorRole] = useState("Technical Writer");
  const [bAuthorAvatar, setBAuthorAvatar] = useState("AM");

  // Auto-generate slug from title (only when creating a new post)
  useEffect(() => {
    if (!editItem && bTitle) {
      const generated = bTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setBSlug(generated);
    }
  }, [bTitle, editItem]);

  const [jTitle, setJTitle] = useState("");
  const [jType, setJType] = useState("Full-Time");
  const [jLocation, setJLocation] = useState("Remote");
  const [jDept, setJDept] = useState("Engineering");
  const [jDesc, setJDesc] = useState("");
  const [jCategory, setJCategory] = useState<"Job" | "Intern">("Job");

  // Preset Gradients
  const portfolioGradients = [
    "bg-gradient-to-br from-indigo-900 to-slate-800",
    "bg-gradient-to-br from-emerald-900 to-teal-900",
    "bg-gradient-to-br from-purple-900 to-fuchsia-900",
    "bg-gradient-to-br from-blue-900 to-cyan-900",
    "bg-gradient-to-br from-orange-900 to-red-900",
    "bg-gradient-to-br from-gray-800 to-slate-900",
  ];

  const blogGradients = [
    "bg-gradient-to-br from-blue-900 to-purple-900",
    "bg-gradient-to-br from-emerald-900 to-cyan-900",
    "bg-gradient-to-br from-orange-900 to-rose-900",
    "bg-gradient-to-br from-indigo-900 to-blue-900",
    "bg-gradient-to-br from-slate-800 to-zinc-900",
    "bg-gradient-to-br from-fuchsia-900 to-pink-900",
  ];

  // File Upload State & Logic
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "portfolio" | "blog" | "blog-inline" | "gallery",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      triggerNotification("error", "Please select a valid image file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (target === "portfolio") {
          setPImage(data.url);
        } else if (target === "blog") {
          setBImage(data.url);
        } else if (target === "gallery") {
          setGalleryImages((prev) => [...prev, data.url]);
        } else if (target === "blog-inline") {
          // Insert at current cursor position in blog content textarea
          const textarea = document.getElementById(
            "bContent",
          ) as HTMLTextAreaElement | null;
          if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = textarea.value;
            const before = text.substring(0, start);
            const after = text.substring(end, text.length);
            const markdownImage = `![Image Description](${data.url})`;
            setBContent(before + markdownImage + after);

            setTimeout(() => {
              textarea.focus();
              textarea.selectionStart = textarea.selectionEnd =
                start + markdownImage.length;
            }, 50);
          } else {
            setBContent(
              (prev) => prev + `\n![Image Description](${data.url})\n`,
            );
          }
        }
        triggerNotification("success", "Real image uploaded successfully!");
      } else {
        triggerNotification("error", data.error || "Failed to upload image.");
      }
    } catch (err) {
      triggerNotification(
        "error",
        "Network error occurred during image upload.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((current) => current.filter((_, idx) => idx !== index));
  };

  // Helper trigger notification
  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Check auth session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch all database records when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setIsLoadingData(true);
    try {
      const [portRes, blogRes, jobsRes, enqRes, appRes, offerRes, settingsRes] =
        await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/blog"),
          fetch("/api/jobs"),
          fetch("/api/enquiries"),
          fetch("/api/applications"),
          fetch("/api/offers"),
          fetch("/api/settings"),
        ]);

      const [
        portData,
        blogData,
        jobsData,
        enqData,
        appData,
        offerData,
        settingsData,
      ] = await Promise.all([
        portRes.json(),
        blogRes.json(),
        jobsRes.json(),
        enqRes.json(),
        appRes.json(),
        offerRes.json(),
        settingsRes.json(),
      ]);

      setProjects(Array.isArray(portData) ? portData : []);
      setPosts(Array.isArray(blogData) ? blogData : []);
      setJobs(Array.isArray(jobsData) ? jobsData : []);
      setEnquiries(Array.isArray(enqData) ? enqData : []);
      setApplications(Array.isArray(appData) ? appData : []);

      if (offerData) {
        setOfferText(offerData.text || "");
        setOfferBtnText(offerData.buttonText || "Call Now");
        setOfferBtnLink(offerData.buttonLink || "tel:+919508904653");
        setOfferIsActive(
          offerData.isActive !== undefined ? offerData.isActive : false,
        );
      }

      if (settingsData) {
        setCompanyPhone(settingsData.phone || "");
        setCompanyEmail(settingsData.email || "");
        setCompanyRegistrationDate(settingsData.registrationDate || "");
        setCompanyAddress(settingsData.address || "");
        setGalleryImages(settingsData.galleryImages || []);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
      triggerNotification("error", "Failed to sync data in real-time.");
    } finally {
      setIsLoadingData(false);
    }
  };

  const { updateSettings } = useSettings();

  const handleCompanySettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCompanySettings(true);
    try {
      const updated = await updateSettings({
        phone: companyPhone,
        email: companyEmail,
        registrationDate: companyRegistrationDate,
        address: companyAddress,
        galleryImages,
      });

      if (updated) {
        triggerNotification(
          "success",
          "Company settings updated successfully!",
        );
      } else {
        triggerNotification("error", "Failed to update company settings.");
      }
    } catch (err) {
      triggerNotification(
        "error",
        "Network error occurred while saving company settings.",
      );
    } finally {
      setIsSavingCompanySettings(false);
    }
  };

  // Auth Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        triggerNotification("success", "Welcome back, Admin!");
      } else {
        setAuthError(data.error || "Login failed");
      }
    } catch (err) {
      setAuthError("Failed to connect to authentication backend");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setIsAuthenticated(false);
        triggerNotification("success", "Logged out successfully");
      }
    } catch (err) {
      triggerNotification("error", "Logout failed");
    }
  };

  // Modal open helpers
  const openPortfolioModal = (item: any = null) => {
    setEditItem(item);
    if (item) {
      setPTitle(item.title);
      setPCategory(item.category);
      setPDesc(item.desc);
      setPTags(item.tags.join(", "));
      setPImage(item.image);
      setPExternal(item.externalLink || "");
      setPCode(item.codeLink || "");
    } else {
      setPTitle("");
      setPCategory("Web App");
      setPDesc("");
      setPTags("");
      setPImage("bg-gradient-to-br from-indigo-900 to-slate-800");
      setPExternal("");
      setPCode("");
    }
    setModalType("portfolio");
  };

  const openBlogModal = (item: any = null) => {
    setEditItem(item);
    if (item) {
      setBTitle(item.title);
      setBExcerpt(item.excerpt);
      setBContent(item.content);
      setBCategory(item.category);
      setBAuthor(item.author);
      setBDate(item.date);
      setBImage(item.image);
      setBFeatured(item.featured || false);
      setBSlug(item.slug || "");
      setBReadTime(item.readTime || "5 MIN READ");
      setBAuthorRole(item.authorRole || "Technical Writer");
      setBAuthorAvatar(item.authorAvatar || "AM");
    } else {
      setBTitle("");
      setBExcerpt("");
      setBContent("");
      setBCategory("Technology");
      setBAuthor("Alex Morgan");
      setBSlug("");
      setBReadTime("5 MIN READ");
      setBAuthorRole("Technical Writer");
      setBAuthorAvatar("AM");

      // Auto format today's date (Oct 24, 2023)
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
        year: "numeric",
      };
      setBDate(new Date().toLocaleDateString("en-US", options));

      setBImage("bg-gradient-to-br from-blue-900 to-purple-900");
      setBFeatured(false);
    }
    setModalType("blog");
  };

  const openJobModal = (item: any = null) => {
    setEditItem(item);
    if (item) {
      setJTitle(item.title);
      setJType(item.type);
      setJLocation(item.location);
      setJDept(item.dept);
      setJDesc(item.description || "");
      setJCategory(item.category || "Job");
    } else {
      setJTitle("");
      setJType("Full-Time");
      setJLocation("Remote");
      setJDept("Engineering");
      setJDesc("");
      setJCategory("Job");
    }
    setModalType("job");
  };

  // CRUD Submission Handlers
  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: pTitle,
      category: pCategory,
      desc: pDesc,
      tags: pTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      image: pImage,
      externalLink: pExternal,
      codeLink: pCode,
    };

    try {
      const url = editItem
        ? `/api/portfolio/${editItem._id}`
        : "/api/portfolio";
      const method = editItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerNotification(
          "success",
          editItem
            ? "Portfolio project updated!"
            : "New portfolio project added!",
        );
        setModalType(null);
        fetchAllData();
      } else {
        const errData = await res.json();
        triggerNotification("error", errData.error || "Save failed");
      }
    } catch (err) {
      triggerNotification("error", "Network error. Please try again.");
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: bTitle,
      excerpt: bExcerpt,
      content: bContent,
      category: bCategory,
      author: bAuthor,
      date: bDate,
      image: bImage,
      featured: bFeatured,
      slug: bSlug,
      readTime: bReadTime,
      authorRole: bAuthorRole,
      authorAvatar: bAuthorAvatar,
    };

    try {
      const url = editItem ? `/api/blog/${editItem._id}` : "/api/blog";
      const method = editItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerNotification(
          "success",
          editItem ? "Blog post updated!" : "New blog post published!",
        );
        setModalType(null);
        fetchAllData();
      } else {
        const errData = await res.json();
        triggerNotification("error", errData.error || "Publish failed");
      }
    } catch (err) {
      triggerNotification("error", "Network error. Please try again.");
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: jTitle,
      type: jType,
      location: jLocation,
      dept: jDept,
      description: jDesc,
      category: jCategory,
    };

    try {
      const url = editItem ? `/api/jobs/${editItem._id}` : "/api/jobs";
      const method = editItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerNotification(
          "success",
          editItem ? "Job listing updated!" : "New career listing uploaded!",
        );
        setModalType(null);
        fetchAllData();
      } else {
        const errData = await res.json();
        triggerNotification("error", errData.error || "Upload failed");
      }
    } catch (err) {
      triggerNotification("error", "Network error. Please try again.");
    }
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingOffer(true);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: offerText,
          buttonText: offerBtnText,
          buttonLink: offerBtnLink,
          isActive: offerIsActive,
        }),
      });

      if (res.ok) {
        triggerNotification(
          "success",
          "Announcement banner updated successfully!",
        );
        fetchAllData();
      } else {
        const errData = await res.json();
        triggerNotification(
          "error",
          errData.error || "Failed to update banner.",
        );
      }
    } catch (err) {
      triggerNotification("error", "Network error occurred.");
    } finally {
      setIsSavingOffer(false);
    }
  };

  // Delete handlers
  const handleDeleteItem = async (
    type: "portfolio" | "blog" | "job" | "enquiry" | "application",
    id: string,
  ) => {
    if (
      !confirm(
        `Are you sure you want to delete this ${type}? This action cannot be undone.`,
      )
    )
      return;

    try {
      let path = "";
      if (type === "portfolio") path = "portfolio";
      else if (type === "blog") path = "blog";
      else if (type === "job") path = "jobs";
      else if (type === "enquiry") path = "enquiries";
      else if (type === "application") path = "applications";

      const res = await fetch(`/api/${path}/${id}`, { method: "DELETE" });

      if (res.ok) {
        triggerNotification(
          "success",
          `${type.charAt(0).toUpperCase() + type.slice(1)} removed successfully.`,
        );
        fetchAllData();
      } else {
        triggerNotification("error", "Failed to delete item.");
      }
    } catch (err) {
      triggerNotification("error", "Network error occurred.");
    }
  };

  // Pre-load loading screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050816] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-blue animate-spin" />
      </div>
    );
  }

  // 1. LOGIN UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-50 dark:bg-[#050816] tech-grid transition-colors duration-500 py-12">
        <Interactive3DTexture />

        {/* Decorative Glowing Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="w-full max-w-md bg-white/45 dark:bg-[#080b17]/50 border border-slate-200/80 dark:border-white/10 rounded-[32px] p-10 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)] z-10 relative group hover:border-brand-blue/30 transition-all duration-500"
        >
          {/* Top subtle light stroke */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent blur-[1px] opacity-70" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue dark:text-brand-accent mb-6 text-[10px] font-bold uppercase tracking-wider font-mono">
              [ SECURE NODE DEPLOYMENT ]
            </div>
            <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono uppercase tracking-wider">
              Provide high-clearance admin keys
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {authError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs flex items-center gap-2 font-mono"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className={labelCls}>EMAIL ADDRESS</label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                  size={16}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nooraxis.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all text-sm font-sans"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelCls}>SECURE PASSWORD</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all text-sm font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 bg-gradient-to-r from-brand-blue to-brand-accent hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 cursor-pointer disabled:opacity-75 font-mono"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AUTHENTICATING CLIENT...
                </>
              ) : (
                "UNLOCK CONTROL DECK"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] tech-grid text-slate-900 dark:text-slate-100 transition-colors duration-500 py-12 relative overflow-hidden">
      <Interactive3DTexture />
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Toast Alert */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-2xl border flex items-center gap-3 shadow-xl backdrop-blur-md ${
              notification.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                : "bg-red-500/10 border-red-500/20 text-red-500"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-7xl mt-4 relative z-10">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/80 dark:border-white/5 pb-8 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue dark:text-brand-accent mb-2 text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles
                size={14}
                className="animate-spin"
                style={{ animationDuration: "4s" }}
              />
              [ CONTROL PANEL ACTIVE ]
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading dark:text-white tracking-tight">
              Admin Workspace
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-slate-250 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-red-500/10 hover:border-red-500/20 text-red-600 dark:text-red-400 hover:text-red-500 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer font-mono"
          >
            <LogOut size={14} /> [ DISCONNECT ]
          </button>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {[
              {
                id: "overview",
                label: "Overview",
                code: "[SYS-01]",
                icon: LayoutGrid,
              },
              {
                id: "portfolio",
                label: "Portfolio Section",
                code: "[PRT-02]",
                icon: Layers,
              },
              {
                id: "blog",
                label: "Blog Articles",
                code: "[BLG-03]",
                icon: BookOpen,
              },
              {
                id: "jobs",
                label: "Careers (Jobs)",
                code: "[JOB-04]",
                icon: Briefcase,
              },
              {
                id: "enquiries",
                label: "Service Enquiries",
                code: "[ENQ-05]",
                icon: Mail,
              },
              {
                id: "applications",
                label: "Job Applications",
                code: "[APP-06]",
                icon: GraduationCap,
              },
              {
                id: "offers",
                label: "Offers Banner",
                code: "[OFR-07]",
                icon: Tag,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 font-mono ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-brand-blue to-blue-600 border border-brand-blue/30 dark:border-brand-accent/30 text-white shadow-[0_8px_30px_rgba(37,99,235,0.25)] scale-[1.02] cursor-pointer"
                    : "bg-white/45 dark:bg-white/3 hover:bg-white/60 dark:hover:bg-white/8 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/5 hover:scale-[1.01] cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </div>
                <span
                  className={`text-[9px] font-mono ${activeTab === tab.id ? "text-blue-100" : "text-slate-400 dark:text-slate-500"}`}
                >
                  {tab.code}
                </span>
              </button>
            ))}
          </div>

          {/* Right Core Panel content */}
          <div className="lg:col-span-3">
            {isLoadingData ? (
              <div className="h-64 flex flex-col items-center justify-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl gap-4">
                <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Syncing live database...
                </span>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {/* 2A. TAB: OVERVIEW */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="space-y-8"
                  >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                      {[
                        {
                          label: "Portfolio",
                          count: projects.length,
                          icon: Layers,
                          code: "PRT-SYS",
                          gradient: "from-indigo-600 to-purple-600",
                        },
                        {
                          label: "Blog",
                          count: posts.length,
                          icon: BookOpen,
                          code: "BLG-SYS",
                          gradient: "from-emerald-600 to-teal-600",
                        },
                        {
                          label: "Career Roles",
                          count: jobs.length,
                          icon: Briefcase,
                          code: "JOB-SYS",
                          gradient: "from-orange-600 to-rose-600",
                        },
                        {
                          label: "Service Leads",
                          count: enquiries.length,
                          icon: Mail,
                          code: "ENQ-SYS",
                          gradient: "from-blue-600 to-cyan-600",
                        },
                        {
                          label: "Applications",
                          count: applications.length,
                          icon: GraduationCap,
                          code: "APP-SYS",
                          gradient: "from-fuchsia-600 to-pink-600",
                        },
                      ].map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-white/40 dark:bg-white/3 backdrop-blur-md border border-slate-200/80 dark:border-white/5 rounded-3xl p-6 shadow-sm flex items-center justify-between hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 group"
                        >
                          <div>
                            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 block mb-1">
                              [{stat.code}]
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-2">
                              {stat.label}
                            </p>
                            <div className="flex items-baseline gap-2">
                              <h3 className="text-4xl font-extrabold font-mono dark:text-white tracking-tight">
                                {stat.count}
                              </h3>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                          </div>
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.gradient} flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform`}
                          >
                            <stat.icon size={20} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Guide */}
                    <div className="bg-white/40 dark:bg-white/3 backdrop-blur-md border border-slate-200/80 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                      <h2 className="text-xl font-bold font-heading mb-4 dark:text-white tracking-tight">
                        Real-Time Database Operations
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Welcome to the administrative control hub of Nooraxis.
                        Changes made within the specific tabs instantly reflect
                        in the live application database. Visitors of the
                        Nooraxis site will dynamically load the updated records,
                        complete with visual styling and interactive controls.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200/30 dark:border-white/5">
                          <h4 className="font-bold text-sm mb-2 dark:text-white font-mono uppercase tracking-wider text-brand-blue dark:text-brand-accent">
                            [ LIVE ACTIONS ]
                          </h4>
                          <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc list-inside">
                            <li>
                              Create, edit or delete items instantly from the
                              live nodes.
                            </li>
                            <li>
                              Upload custom gradient backgrounds or type
                              standard image URLs.
                            </li>
                            <li>
                              Rearrange blog articles and set specific posts as
                              Featured.
                            </li>
                          </ul>
                        </div>
                        <div className="p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200/30 dark:border-white/5">
                          <h4 className="font-bold text-sm mb-2 dark:text-white font-mono uppercase tracking-wider text-brand-blue dark:text-brand-accent">
                            [ SECURITY PROTOCOL ]
                          </h4>
                          <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc list-inside">
                            <li>
                              Sessions expire automatically after exactly 24
                              hours.
                            </li>
                            <li>
                              All modification endpoints are strictly protected
                              by HTTPOnly cookies.
                            </li>
                            <li>
                              Always log out when accessing from a shared
                              computer.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2B. TAB: PORTFOLIO */}
                {activeTab === "portfolio" && (
                  <motion.div
                    key="portfolio"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
                      <div>
                        <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                          Portfolio Management
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Manage case studies and client projects in real-time.
                        </p>
                      </div>
                      <button
                        onClick={() => openPortfolioModal()}
                        className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-brand-blue/15 transition-all cursor-pointer font-mono"
                      >
                        <Plus size={14} /> [ ADD PROJECT ]
                      </button>
                    </div>

                    {projects.length === 0 ? (
                      <div className="text-center py-16 bg-white/40 dark:bg-white/3 backdrop-blur-md border border-dashed border-slate-300 dark:border-white/10 rounded-3xl">
                        <Layers className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                          No projects found. Add your first portfolio item!
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((proj, idx) => (
                          <div
                            key={proj._id}
                            className="bg-white/40 dark:bg-white/3 backdrop-blur-md border border-slate-200/80 dark:border-white/5 rounded-3xl overflow-hidden flex flex-col h-full group hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 shadow-sm relative"
                          >
                            {/* Monospace Indicator Badge */}
                            <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white font-mono text-[9px] font-semibold uppercase tracking-wider">
                              [P-{String(idx + 1).padStart(2, "0")}]
                            </div>

                            <div
                              className={`h-48 w-full ${proj.image.startsWith("bg-") ? proj.image : "bg-slate-800"} relative flex items-center justify-center overflow-hidden border-b border-slate-200 dark:border-white/5`}
                            >
                              {!proj.image.startsWith("bg-") && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={proj.image}
                                  alt={proj.title}
                                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                              {proj.image.startsWith("bg-") && (
                                <span className="font-heading font-extrabold text-white/20 tracking-widest text-3xl relative z-10 uppercase">
                                  {proj.title.substring(0, 3)}
                                </span>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow relative">
                              <div className="flex items-center justify-between gap-4 mb-2">
                                <span className="text-brand-accent text-xs font-bold uppercase tracking-wider font-mono">
                                  {proj.category}
                                </span>

                                {/* Click-to-copy ID */}
                                <button
                                  onClick={() => copyToClipboard(proj._id)}
                                  className="text-[9px] font-mono text-slate-400 hover:text-brand-blue dark:hover:text-brand-accent bg-slate-100/50 dark:bg-white/5 border border-slate-200/85 dark:border-white/10 px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedId === proj._id
                                    ? "Copied!"
                                    : `ID: ${proj._id.substring(0, 6)}..`}
                                </button>
                              </div>
                              <h3 className="text-lg font-bold mb-3 dark:text-white tracking-tight group-hover:text-brand-blue dark:group-hover:text-brand-accent transition-colors">
                                {proj.title}
                              </h3>
                              <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 line-clamp-3 leading-relaxed">
                                {proj.desc}
                              </p>

                              <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                                {proj.tags.map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-[10px] font-medium text-slate-600 dark:text-slate-300 font-mono"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5 mt-auto">
                                <div className="flex gap-3">
                                  {proj.externalLink && (
                                    <a
                                      href={proj.externalLink}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-brand-blue/10 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-brand-blue flex items-center justify-center transition-colors"
                                    >
                                      <ExternalLink size={14} />
                                    </a>
                                  )}
                                  {proj.codeLink && (
                                    <a
                                      href={proj.codeLink}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-brand-blue/10 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-brand-blue flex items-center justify-center transition-colors"
                                    >
                                      <Code size={14} />
                                    </a>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openPortfolioModal(proj)}
                                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-brand-blue/10 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-brand-blue flex items-center justify-center transition-colors cursor-pointer"
                                  >
                                    <Edit3 size={14} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteItem("portfolio", proj._id)
                                    }
                                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2C. TAB: BLOG */}
                {activeTab === "blog" && (
                  <motion.div
                    key="blog"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
                      <div>
                        <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                          Blog Management
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Compose, preview, and publish static articles in
                          real-time.
                        </p>
                      </div>
                      <button
                        onClick={() => openBlogModal()}
                        className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-brand-blue/15 transition-all cursor-pointer font-mono"
                      >
                        <Plus size={14} /> [ WRITE ARTICLE ]
                      </button>
                    </div>

                    {posts.length === 0 ? (
                      <div className="text-center py-16 bg-white/40 dark:bg-white/3 backdrop-blur-md border border-dashed border-slate-300 dark:border-white/10 rounded-3xl">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                          No blog posts found. Publish your first article!
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white/45 dark:bg-[#080b17]/50 border border-slate-200/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm backdrop-blur-2xl">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/2 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">
                                <th className="px-6 py-4">Index</th>
                                <th className="px-6 py-4">Title / ID</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Author</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">
                                  Featured
                                </th>
                                <th className="px-6 py-4 text-right">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                              {posts.map((post, idx) => (
                                <tr
                                  key={post._id}
                                  className="hover:bg-slate-50 dark:hover:bg-white/3 transition-colors group"
                                >
                                  <td className="px-6 py-4 font-mono text-xs text-slate-400 dark:text-slate-500 font-bold">
                                    [B-{String(idx + 1).padStart(2, "0")}]
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1 max-w-xs md:max-w-sm">
                                      <span className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-brand-blue dark:group-hover:text-brand-accent transition-colors">
                                        {post.title}
                                      </span>
                                      {post.slug && (
                                        <a
                                          href={`/blog/${post.slug}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-[9.5px] text-brand-blue dark:text-brand-accent hover:underline flex items-center gap-1 w-fit font-mono"
                                        >
                                          <Globe size={10} /> /{post.slug}
                                        </a>
                                      )}
                                      <button
                                        onClick={() =>
                                          copyToClipboard(post._id)
                                        }
                                        className="text-[9px] font-mono text-slate-400 hover:text-brand-blue dark:hover:text-brand-accent flex items-center gap-1 cursor-pointer w-fit"
                                      >
                                        {copiedId === post._id ? (
                                          <span className="text-emerald-500 flex items-center gap-1">
                                            <Check size={10} /> Copied
                                          </span>
                                        ) : (
                                          <span className="flex items-center gap-1">
                                            <Copy size={10} /> ID:{" "}
                                            {post._id.substring(0, 8)}...
                                          </span>
                                        )}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-[10px] font-bold text-slate-600 dark:text-slate-300 font-mono uppercase tracking-wider">
                                      {post.category}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                                    {post.author}
                                  </td>
                                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                                    {post.date}
                                  </td>
                                  <td className="px-6 py-4">
                                    {post.featured ? (
                                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 w-fit mx-auto shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        FEATURED
                                      </span>
                                    ) : (
                                      <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-250 dark:border-white/5 text-slate-400 dark:text-slate-500 text-[9px] font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 w-fit mx-auto">
                                        STANDARD
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        onClick={() => openBlogModal(post)}
                                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-brand-blue/10 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-brand-blue flex items-center justify-center transition-colors cursor-pointer"
                                        title="Edit Article"
                                      >
                                        <Edit3 size={14} />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteItem("blog", post._id)
                                        }
                                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                                        title="Delete Article"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2D. TAB: JOBS */}
                {activeTab === "jobs" && (
                  <motion.div
                    key="jobs"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
                      <div>
                        <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                          Careers & Positions
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Post new open positions and manage hiring listings.
                        </p>
                      </div>
                      <button
                        onClick={() => openJobModal()}
                        className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-brand-blue/15 transition-all cursor-pointer font-mono"
                      >
                        <Plus size={14} /> [ UPLOAD ROLE ]
                      </button>
                    </div>

                    {jobs.length === 0 ? (
                      <div className="text-center py-16 bg-white/40 dark:bg-white/3 backdrop-blur-md border border-dashed border-slate-300 dark:border-white/10 rounded-3xl">
                        <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                          No open positions listed. Upload your first job!
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {jobs.map((job, idx) => {
                          const isIntern =
                            job.category === "Intern" ||
                            job.type?.toLowerCase() === "internship";
                          return (
                            <div
                              key={job._id}
                              className="p-6 bg-white/45 dark:bg-[#080b17]/50 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-brand-blue/30 dark:hover:border-brand-blue/30 hover:scale-[1.005] transition-all duration-300 group relative"
                            >
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500 font-bold">
                                    {isIntern
                                      ? `[INT-${String(idx + 1).padStart(2, "0")}]`
                                      : `[JOB-${String(idx + 1).padStart(2, "0")}]`}
                                  </span>
                                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-accent transition-colors">
                                    {job.title}
                                  </h3>
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${
                                      isIntern
                                        ? "bg-purple-500/10 border border-purple-500/20 text-purple-500 dark:text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                                        : "bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                                    }`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${isIntern ? "bg-purple-500 animate-pulse" : "bg-blue-500 animate-pulse"}`}
                                    />
                                    {isIntern
                                      ? "Internship"
                                      : job.category || "Job"}
                                  </span>

                                  {/* Click-to-copy ID */}
                                  <button
                                    onClick={() => copyToClipboard(job._id)}
                                    className="text-[9px] font-mono text-slate-400 hover:text-brand-blue dark:hover:text-brand-accent bg-slate-100/50 dark:bg-white/5 border border-slate-200/85 dark:border-white/10 px-2.5 py-0.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    {copiedId === job._id
                                      ? "Copied!"
                                      : `ID: ${job._id.substring(0, 8)}..`}
                                  </button>
                                </div>

                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                  <span className="flex items-center gap-1">
                                    <Briefcase size={12} /> {job.type}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Globe size={12} /> {job.location}
                                  </span>
                                  <span>•</span>
                                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-300 font-mono text-[9px] uppercase tracking-wider">
                                    {job.dept}
                                  </span>
                                </div>
                                {job.description && (
                                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl bg-slate-100/30 dark:bg-slate-950/40 p-3.5 rounded-2xl border border-slate-200/50 dark:border-white/5">
                                    {job.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2.5 self-end md:self-auto shrink-0">
                                <button
                                  onClick={() => openJobModal(job)}
                                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-brand-blue/10 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-brand-blue dark:text-slate-400 flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
                                >
                                  <Edit3 size={12} /> [ EDIT ]
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteItem("job", job._id)
                                  }
                                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-red-500 dark:text-slate-400 flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
                                >
                                  <Trash2 size={12} /> [ DELETE ]
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2E. TAB: SERVICE ENQUIRIES */}
                {activeTab === "enquiries" && (
                  <motion.div
                    key="enquiries"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-slate-200 dark:border-white/5 pb-4">
                      <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                        Service Leads & Enquiries
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Incoming inquiries submitted through site consultation
                        channels.
                      </p>
                    </div>

                    {enquiries.length === 0 ? (
                      <div className="text-center py-16 bg-white/40 dark:bg-white/3 backdrop-blur-md border border-dashed border-slate-300 dark:border-white/10 rounded-3xl">
                        <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                          No contact or service enquiries found.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {enquiries.map((enq, idx) => (
                          <div
                            key={enq._id}
                            className="p-6 bg-white/45 dark:bg-[#080b17]/50 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-[32px] flex flex-col justify-between hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 shadow-sm relative group"
                          >
                            <div className="absolute top-4 right-6 text-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-2">
                              <span>
                                {new Date(enq.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                              <span>•</span>
                              <span className="text-brand-blue dark:text-brand-accent">
                                [LEAD-{String(idx + 1).padStart(2, "0")}]
                              </span>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 mt-2">
                              <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                  {enq.firstName} {enq.lastName}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1.5 mb-3">
                                  <button
                                    onClick={() => copyToClipboard(enq.email)}
                                    className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono hover:text-brand-blue dark:hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-lg px-2.5 py-0.5"
                                  >
                                    <Mail size={12} className="shrink-0" />
                                    {enq.email}
                                  </button>
                                  {enq.phone && (
                                    <button
                                      onClick={() => copyToClipboard(enq.phone)}
                                      className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono hover:text-brand-blue dark:hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-lg px-2.5 py-0.5"
                                    >
                                      <Phone size={12} className="shrink-0" />
                                      {enq.phone}
                                    </button>
                                  )}
                                </div>
                                <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-[10px] font-mono border border-brand-blue/20 uppercase tracking-wider shadow-[0_0_12px_rgba(37,99,235,0.1)]">
                                  SERVICE: {enq.service}
                                </span>
                              </div>

                              <div className="flex items-center gap-2.5 self-end md:self-auto mt-2 md:mt-0">
                                <button
                                  onClick={() => copyToClipboard(enq._id)}
                                  className="text-[9px] font-mono text-slate-400 hover:text-brand-blue dark:hover:text-brand-accent bg-slate-100/50 dark:bg-white/5 border border-slate-200/85 dark:border-white/10 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                                  title="Copy Lead ID"
                                >
                                  {copiedId === enq._id
                                    ? "Copied!"
                                    : `ID: ${enq._id.substring(0, 8)}..`}
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteItem("enquiry", enq._id)
                                  }
                                  className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer border border-slate-200/50 dark:border-white/10 rounded-xl p-1.5 bg-slate-100/50 dark:bg-white/5"
                                  title="Delete Lead Record"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="p-4 bg-slate-100/30 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-white/5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans relative">
                              <span className="block font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                                [ INCOMING CLIENT MEMO ]
                              </span>
                              {enq.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2F. TAB: CAREER APPLICATIONS */}
                {activeTab === "applications" && (
                  <motion.div
                    key="applications"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-slate-200 dark:border-white/5 pb-4">
                      <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                        Talent Submissions
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Review candidates who submitted credentials via the
                        careers portal.
                      </p>
                    </div>

                    {applications.length === 0 ? (
                      <div className="text-center py-16 bg-white/40 dark:bg-white/3 backdrop-blur-md border border-dashed border-slate-300 dark:border-white/10 rounded-3xl">
                        <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                          No talent submissions found.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {applications.map((app, idx) => (
                          <div
                            key={app._id}
                            className="p-6 bg-white/45 dark:bg-[#080b17]/50 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-[32px] flex flex-col hover:border-brand-blue/30 dark:hover:border-brand-blue/30 transition-all duration-300 shadow-sm relative group"
                          >
                            <div className="absolute top-4 right-6 text-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-2">
                              <span>
                                {new Date(app.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                              <span>•</span>
                              <span className="text-brand-blue dark:text-brand-accent">
                                [APP-{String(idx + 1).padStart(2, "0")}]
                              </span>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 mt-2">
                              <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                  {app.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1.5 mb-3 text-sm">
                                  <button
                                    onClick={() => copyToClipboard(app.email)}
                                    className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono hover:text-brand-blue dark:hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-lg px-2.5 py-0.5"
                                  >
                                    <Mail size={12} className="shrink-0" />
                                    {app.email}
                                  </button>
                                  {app.phone && (
                                    <button
                                      onClick={() => copyToClipboard(app.phone)}
                                      className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono hover:text-brand-blue dark:hover:text-brand-accent transition-colors flex items-center gap-1 cursor-pointer bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-lg px-2.5 py-0.5"
                                    >
                                      <Phone size={12} className="shrink-0" />
                                      {app.phone}
                                    </button>
                                  )}
                                </div>
                                <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent font-bold text-[10px] font-mono border border-brand-accent/20 uppercase tracking-wider shadow-[0_0_12px_rgba(236,72,153,0.1)]">
                                  ROLE ID / POSITION: {app.position}
                                </span>
                              </div>

                              <div className="flex items-center gap-2.5 self-end md:self-auto mt-2 md:mt-0">
                                <button
                                  onClick={() => copyToClipboard(app._id)}
                                  className="text-[9px] font-mono text-slate-400 hover:text-brand-blue dark:hover:text-brand-accent bg-slate-100/50 dark:bg-white/5 border border-slate-200/85 dark:border-white/10 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                                  title="Copy Application ID"
                                >
                                  {copiedId === app._id
                                    ? "Copied!"
                                    : `ID: ${app._id.substring(0, 8)}..`}
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteItem("application", app._id)
                                  }
                                  className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer border border-slate-200/50 dark:border-white/10 rounded-xl p-1.5 bg-slate-100/50 dark:bg-white/5"
                                  title="Delete Talent Record"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>

                            {app.message && (
                              <div className="p-4 bg-slate-100/30 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-white/5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 whitespace-pre-wrap font-sans relative">
                                <span className="block font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                                  [ COVER STATEMENT / MEMO ]
                                </span>
                                {app.message}
                              </div>
                            )}

                            <div className="flex flex-wrap items-center gap-3">
                              <a
                                href={app.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider font-mono rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 text-white hover:opacity-95 transition-all flex items-center gap-1.5 shadow-md shadow-brand-blue/15 cursor-pointer"
                              >
                                <ExternalLink size={13} /> [ VIEW RESUME / CV ]
                              </a>
                              {app.portfolioUrl && (
                                <a
                                  href={app.portfolioUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider font-mono rounded-xl bg-white/50 dark:bg-white/5 border border-slate-250 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Globe size={13} /> [ PORTFOLIO / LINKEDIN ]
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2G. TAB: OFFERS BANNER CONTROL */}
                {activeTab === "offers" && (
                  <motion.div
                    key="offers"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="space-y-8"
                  >
                    <div className="border-b border-slate-200 dark:border-white/5 pb-4">
                      <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                        Offers Management
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Control the real-time announcement bar displayed at the
                        very top of all pages.
                      </p>
                    </div>

                    {/* LIVE PREVIEW CONTAINER */}
                    <div className="bg-slate-100/50 dark:bg-slate-900/10 border border-slate-200 dark:border-white/5 rounded-3xl p-6 backdrop-blur-md">
                      <span className="block font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                        [ BANNER REAL-TIME PREVIEW ]
                      </span>

                      {offerIsActive ? (
                        <div className="w-full bg-gradient-to-r from-blue-950 via-[#102a75] to-indigo-950 text-white border border-blue-500/30 rounded-2xl py-3 px-6 relative transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.35)] flex flex-col sm:flex-row items-center justify-center gap-3 text-center overflow-hidden">
                          <div className="flex items-center justify-center flex-wrap gap-1 text-xs font-medium tracking-wide">
                            <span className="text-cyan-400 animate-pulse font-bold mx-1 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]">
                              ★
                            </span>
                            <span className="drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
                              {offerText ||
                                "Limited Time Offer: Your Announcement Copy Here"}
                            </span>
                            <span className="text-cyan-400 animate-pulse font-bold mx-1 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]">
                              ★
                            </span>
                          </div>
                          {offerBtnText && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff5a00] to-[#ff7300] text-white text-[10px] font-bold shadow-[0_2px_10px_rgba(255,90,0,0.4)] shrink-0 select-none">
                              {offerBtnLink.startsWith("tel:") && (
                                <Phone size={10} />
                              )}
                              <span>{offerBtnText}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full py-8 border border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                          <Tag className="w-8 h-8 text-slate-400 mb-2 opacity-50" />
                          <span>Announcement Banner System is Deactivated</span>
                        </div>
                      )}
                    </div>

                    {/* CONTROL FORM */}
                    <form
                      onSubmit={handleOfferSubmit}
                      className="space-y-6 bg-white/40 dark:bg-[#080b17]/50 border border-slate-200/80 dark:border-white/10 rounded-[32px] p-8 backdrop-blur-2xl shadow-sm"
                    >
                      <span className="block font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                        [ SYSTEM CONFIGURATION PANEL ]
                      </span>

                      <div className="space-y-6">
                        {/* Offer text */}
                        <div className="space-y-2">
                          <label className={labelCls}>
                            Announcement text copy
                          </label>
                          <textarea
                            value={offerText}
                            onChange={(e) => setOfferText(e.target.value)}
                            placeholder="e.g., Limited Time Offer: Get 20% OFF on All Website Packages"
                            required
                            rows={3}
                            className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-all font-sans resize-none"
                          />
                        </div>

                        {/* Link and Button Text Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className={labelCls}>CTA Button Text</label>
                            <input
                              type="text"
                              value={offerBtnText}
                              onChange={(e) => setOfferBtnText(e.target.value)}
                              placeholder="e.g., Call Now"
                              className={inputCls}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className={labelCls}>
                              CTA Link / Action URL
                            </label>
                            <input
                              type="text"
                              value={offerBtnLink}
                              onChange={(e) => setOfferBtnLink(e.target.value)}
                              placeholder="e.g., tel:+919508904653 or /contact"
                              className={inputCls}
                            />
                          </div>
                        </div>

                        {/* Toggle switch for Active Status */}
                        <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-white/5 rounded-2xl">
                          <div>
                            <h4 className="text-sm font-bold dark:text-white">
                              Active System Status
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              If enabled, the banner instantly displays at the
                              top of the live site.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setOfferIsActive(!offerIsActive)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                              offerIsActive
                                ? "bg-[#009846]"
                                : "bg-slate-250 dark:bg-white/10"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out ${
                                offerIsActive
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        type="submit"
                        disabled={isSavingOffer}
                        className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-brand-blue to-blue-600 hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 cursor-pointer disabled:opacity-75 font-mono"
                      >
                        {isSavingOffer ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            DEPLOYING BANNER CONFIG...
                          </>
                        ) : (
                          <>
                            <Tag size={14} />[ UPDATE BANNER SYSTEM ]
                          </>
                        )}
                      </button>
                    </form>

                    <form
                      onSubmit={handleCompanySettingsSubmit}
                      className="space-y-6 bg-white/50 dark:bg-[#070b16]/60 border border-slate-200/70 dark:border-white/10 rounded-[32px] p-8 backdrop-blur-2xl shadow-sm mt-8"
                    >
                      <span className="block font-mono text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                        [ COMPANY CONTACT SETTINGS ]
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className={labelCls}>Company Phone</label>
                          <input
                            type="tel"
                            value={companyPhone}
                            onChange={(e) => setCompanyPhone(e.target.value)}
                            placeholder="e.g., +91 9508904653"
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Company Email</label>
                          <input
                            type="email"
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            placeholder="e.g., contact@nooraxis.com"
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>
                            Date of Registration
                          </label>
                          <input
                            type="text"
                            value={companyRegistrationDate}
                            onChange={(e) =>
                              setCompanyRegistrationDate(e.target.value)
                            }
                            placeholder="e.g., 21 May 2026"
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Company Address</label>
                          <input
                            type="text"
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            placeholder="e.g., Madhopara Islam Nagar Purnia"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="space-y-6 mt-6">
                        <div className="space-y-2">
                          <label className={labelCls}>About Page Gallery</label>
                          <div className="flex flex-col gap-3">
                            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                              <input
                                type="url"
                                value={galleryImageUrl}
                                onChange={(e) =>
                                  setGalleryImageUrl(e.target.value)
                                }
                                placeholder="Paste image URL here"
                                className={inputCls}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!galleryImageUrl.trim()) return;
                                  setGalleryImages((prev) => [
                                    ...prev,
                                    galleryImageUrl.trim(),
                                  ]);
                                  setGalleryImageUrl("");
                                }}
                                className="inline-flex items-center justify-center rounded-2xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white hover:bg-brand-blue/90 transition"
                              >
                                Add URL
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {galleryImages.length > 0 ? (
                                galleryImages.map((src, index) => (
                                  <div
                                    key={src + index}
                                    className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/70"
                                  >
                                    <img
                                      src={src}
                                      alt={`Gallery image ${index + 1}`}
                                      className="h-32 w-full object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeGalleryImage(index)}
                                      className="absolute top-3 right-3 rounded-full bg-black/60 p-2 text-white opacity-80 hover:opacity-100 transition"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-slate-950/30 p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                  No gallery images uploaded yet.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSavingCompanySettings}
                        className="w-full md:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-semibold text-sm uppercase tracking-wider shadow-lg shadow-brand-blue/15 hover:opacity-95 transition-all disabled:opacity-70"
                      >
                        {isSavingCompanySettings
                          ? "Saving Company Settings..."
                          : "Save Company Settings"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* CRUD MODALS CONTAINER */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white/90 dark:bg-[#070a19]/90 border border-slate-200 dark:border-white/10 rounded-[36px] p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative backdrop-blur-3xl"
            >
              <button
                onClick={() => setModalType(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white text-2xl font-bold cursor-pointer font-sans"
              >
                &times;
              </button>

              {/* 3A. PORTFOLIO MODAL FORM */}
              {modalType === "portfolio" && (
                <form
                  onSubmit={handlePortfolioSubmit}
                  className="space-y-5 mt-2"
                >
                  <div className="border-b border-slate-200 dark:border-white/5 pb-4 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue dark:text-brand-accent mb-2 text-[9px] font-bold uppercase tracking-wider font-mono">
                      [ PROJECT NODE COMPILATION ]
                    </div>
                    <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                      {editItem
                        ? "Edit Portfolio Case Study"
                        : "Create Portfolio Case Study"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className={labelCls}>Project Title *</label>
                      <input
                        type="text"
                        required
                        value={pTitle}
                        onChange={(e) => setPTitle(e.target.value)}
                        placeholder="FinTech Core Dashboard"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Category *</label>
                      <div className="relative">
                        <select
                          value={pCategory}
                          onChange={(e) => setPCategory(e.target.value)}
                          className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans cursor-pointer appearance-none"
                        >
                          {["Web App", "Mobile", "UI/UX", "Branding"].map(
                            (cat) => (
                              <option
                                key={cat}
                                value={cat}
                                className="bg-white dark:bg-[#070a19] text-slate-800 dark:text-white"
                              >
                                {cat}
                              </option>
                            ),
                          )}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelCls}>Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={pDesc}
                      onChange={(e) => setPDesc(e.target.value)}
                      placeholder="Describe the project objective, engineering achievements, and technical stack details..."
                      className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelCls}>Tags * (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={pTags}
                      onChange={(e) => setPTags(e.target.value)}
                      placeholder="Next.js, WebGL, TypeScript, Tailwind"
                      className={inputCls}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                      <label className={labelCls}>
                        Visual Cover (Gradient or Image URL) *
                      </label>
                      <label className="text-[9px] font-bold text-brand-blue dark:text-brand-accent cursor-pointer hover:opacity-80 flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 dark:border-brand-accent/20 px-3 py-1.5 rounded-xl font-mono uppercase tracking-wider transition-all">
                        <Upload
                          size={12}
                          className={isUploading ? "animate-bounce" : ""}
                        />
                        <span>
                          {isUploading ? "Uploading..." : "Upload Device File"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, "portfolio")}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-2xl ${pImage.startsWith("bg-") ? pImage : "bg-slate-800"} flex-shrink-0 border border-slate-250 dark:border-white/15 relative overflow-hidden flex items-center justify-center shadow-inner`}
                      >
                        {!pImage.startsWith("bg-") && pImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={pImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                        {pImage.startsWith("bg-") && (
                          <span className="text-[9px] font-bold text-white/50 font-mono uppercase">
                            GRAD
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={pImage}
                        onChange={(e) => setPImage(e.target.value)}
                        placeholder="bg-gradient-to-br from-indigo-900 to-slate-800 or /uploads/..."
                        className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-mono"
                      />
                    </div>
                    <div className="pt-1">
                      <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-2 font-mono uppercase tracking-wider">
                        [ Predefined HSL Gradients ]
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {portfolioGradients.map((grad, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setPImage(grad)}
                            className={`w-8 h-8 rounded-xl ${grad} border-2 ${pImage === grad ? "border-brand-blue scale-105" : "border-transparent"} hover:scale-105 transition-all cursor-pointer`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-2">
                      <label className={labelCls}>
                        Live Link (External URL)
                      </label>
                      <input
                        type="url"
                        value={pExternal}
                        onChange={(e) => setPExternal(e.target.value)}
                        placeholder="https://myproject.com"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Source Code URL</label>
                      <input
                        type="url"
                        value={pCode}
                        onChange={(e) => setPCode(e.target.value)}
                        placeholder="https://github.com/myusername/project"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-6 bg-gradient-to-r from-brand-blue to-brand-accent hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 cursor-pointer font-mono"
                  >
                    {editItem
                      ? "UPDATE PORTFOLIO NODE"
                      : "PUBLISH PORTFOLIO NODE"}
                  </button>
                </form>
              )}

              {/* 3B. BLOG MODAL FORM */}
              {modalType === "blog" && (
                <form onSubmit={handleBlogSubmit} className="space-y-5 mt-2">
                  <div className="border-b border-slate-200 dark:border-white/5 pb-4 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue dark:text-brand-accent mb-2 text-[9px] font-bold uppercase tracking-wider font-mono">
                      [ ARTICLE NODE COMPILATION ]
                    </div>
                    <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                      {editItem ? "Edit Blog Article" : "Compose Blog Article"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className={labelCls}>Article Title *</label>
                      <input
                        type="text"
                        required
                        value={bTitle}
                        onChange={(e) => setBTitle(e.target.value)}
                        placeholder="Future-Proofing Web Platforms"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Category *</label>
                      <input
                        type="text"
                        required
                        value={bCategory}
                        onChange={(e) => setBCategory(e.target.value)}
                        placeholder="Technology / Engineering"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className={labelCls}>
                        Custom URL Slug (e.g. 'scaling-databases')
                      </label>
                      <input
                        type="text"
                        value={bSlug}
                        onChange={(e) => setBSlug(e.target.value)}
                        placeholder="future-proofing-web-platforms"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>
                        Reading Time (e.g. '5 MIN READ') *
                      </label>
                      <input
                        type="text"
                        required
                        value={bReadTime}
                        onChange={(e) => setBReadTime(e.target.value)}
                        placeholder="5 MIN READ"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className={labelCls}>Author *</label>
                      <input
                        type="text"
                        required
                        value={bAuthor}
                        onChange={(e) => setBAuthor(e.target.value)}
                        placeholder="Alex Morgan"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Date *</label>
                      <input
                        type="text"
                        required
                        value={bDate}
                        onChange={(e) => setBDate(e.target.value)}
                        placeholder="May 22, 2026"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className={labelCls}>
                        Author Professional Role *
                      </label>
                      <input
                        type="text"
                        required
                        value={bAuthorRole}
                        onChange={(e) => setBAuthorRole(e.target.value)}
                        placeholder="Principal Engineering Strategist"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>
                        Author Avatar Initials (e.g. 'AM') *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={3}
                        value={bAuthorAvatar}
                        onChange={(e) => setBAuthorAvatar(e.target.value)}
                        placeholder="AM"
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelCls}>
                      Excerpt / Abstract Summary *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={bExcerpt}
                      onChange={(e) => setBExcerpt(e.target.value)}
                      placeholder="A concise, technical overview introducing the topic of this article..."
                      className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                      <label className={labelCls}>
                        Full Content * (Supports Rich Text/Markdown)
                      </label>
                      <label className="text-[9px] font-bold text-brand-blue dark:text-brand-accent cursor-pointer hover:opacity-85 flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 dark:border-brand-accent/20 px-3 py-1 rounded-lg font-mono uppercase tracking-wider transition-all">
                        <Upload
                          size={12}
                          className={isUploading ? "animate-bounce" : ""}
                        />
                        <span>Insert Inline Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, "blog-inline")}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    <textarea
                      id="bContent"
                      required
                      rows={5}
                      value={bContent}
                      onChange={(e) => setBContent(e.target.value)}
                      placeholder="Compose the body of the article using rich Markdown syntax..."
                      className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans font-mono"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                      <label className={labelCls}>
                        Cover Gradient or Image URL *
                      </label>
                      <label className="text-[9px] font-bold text-brand-blue dark:text-brand-accent cursor-pointer hover:opacity-80 flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 dark:border-brand-accent/20 px-3 py-1.5 rounded-xl font-mono uppercase tracking-wider transition-all">
                        <Upload
                          size={12}
                          className={isUploading ? "animate-bounce" : ""}
                        />
                        <span>Upload Device File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, "blog")}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-2xl ${bImage.startsWith("bg-") ? bImage : "bg-slate-800"} flex-shrink-0 border border-slate-250 dark:border-white/15 relative overflow-hidden flex items-center justify-center shadow-inner`}
                      >
                        {!bImage.startsWith("bg-") && bImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={bImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                        {bImage.startsWith("bg-") && (
                          <span className="text-[9px] font-bold text-white/50 font-mono uppercase">
                            GRAD
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={bImage}
                        onChange={(e) => setBImage(e.target.value)}
                        placeholder="bg-gradient-to-br from-blue-900 to-purple-900 or /uploads/..."
                        className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-mono"
                      />
                    </div>
                    <div className="pt-1">
                      <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-2 font-mono uppercase tracking-wider">
                        [ Predefined HSL Gradients ]
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {blogGradients.map((grad, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setBImage(grad)}
                            className={`w-8 h-8 rounded-xl ${grad} border-2 ${bImage === grad ? "border-brand-blue scale-105" : "border-transparent"} hover:scale-105 transition-all cursor-pointer`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-white/5 rounded-2xl p-4">
                    <input
                      type="checkbox"
                      id="bFeatured"
                      checked={bFeatured}
                      onChange={(e) => setBFeatured(e.target.checked)}
                      className="w-4 h-4 rounded-lg text-brand-blue dark:bg-slate-950 focus:ring-0 border-slate-200 dark:border-white/10 cursor-pointer"
                    />
                    <label
                      htmlFor="bFeatured"
                      className="text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer uppercase tracking-wide font-mono"
                    >
                      [ FEATURE THIS ARTICLE AT THE TOP OF THE BLOG PAGE ]
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-6 bg-gradient-to-r from-brand-blue to-brand-accent hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 cursor-pointer font-mono"
                  >
                    {editItem ? "UPDATE ARTICLE NODE" : "PUBLISH ARTICLE NODE"}
                  </button>
                </form>
              )}

              {/* 3C. JOB MODAL FORM */}
              {modalType === "job" && (
                <form onSubmit={handleJobSubmit} className="space-y-5 mt-2">
                  <div className="border-b border-slate-200 dark:border-white/5 pb-4 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue dark:text-brand-accent mb-2 text-[9px] font-bold uppercase tracking-wider font-mono">
                      [ OPPORTUNITY NODE COMPILATION ]
                    </div>
                    <h2 className="text-2xl font-bold font-heading dark:text-white tracking-tight">
                      {editItem
                        ? "Edit Opportunity Listing"
                        : "Create Opportunity Listing"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className={labelCls}>Opportunity Title *</label>
                      <input
                        type="text"
                        required
                        value={jTitle}
                        onChange={(e) => setJTitle(e.target.value)}
                        placeholder="Senior Full-Stack Engineer"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Listing Category *</label>
                      <div className="relative">
                        <select
                          value={jCategory}
                          onChange={(e) =>
                            setJCategory(e.target.value as "Job" | "Intern")
                          }
                          className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans cursor-pointer appearance-none"
                        >
                          <option
                            value="Job"
                            className="bg-white dark:bg-[#070a19] text-slate-800 dark:text-white"
                          >
                            Core Job Opportunity
                          </option>
                          <option
                            value="Intern"
                            className="bg-white dark:bg-[#070a19] text-slate-800 dark:text-white"
                          >
                            Product Internship
                          </option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <label className={labelCls}>Job Type *</label>
                      <div className="relative">
                        <select
                          value={jType}
                          onChange={(e) => setJType(e.target.value)}
                          className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans cursor-pointer appearance-none"
                        >
                          {[
                            "Full-Time",
                            "Part-Time",
                            "Contract",
                            "Internship",
                          ].map((t) => (
                            <option
                              key={t}
                              value={t}
                              className="bg-white dark:bg-[#070a19] text-slate-800 dark:text-white"
                            >
                              {t}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Location *</label>
                      <input
                        type="text"
                        required
                        value={jLocation}
                        onChange={(e) => setJLocation(e.target.value)}
                        placeholder="Remote (EST)"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelCls}>Department *</label>
                      <div className="relative">
                        <select
                          value={jDept}
                          onChange={(e) => setJDept(e.target.value)}
                          className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans cursor-pointer appearance-none"
                        >
                          {[
                            "Engineering",
                            "Design",
                            "Marketing",
                            "Product",
                            "General",
                          ].map((d) => (
                            <option
                              key={d}
                              value={d}
                              className="bg-white dark:bg-[#070a19] text-slate-800 dark:text-white"
                            >
                              {d}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelCls}>Job Description</label>
                    <textarea
                      value={jDesc}
                      onChange={(e) => setJDesc(e.target.value)}
                      placeholder="Specify comprehensive requirements, roles, tech stacks, and team expectations..."
                      rows={5}
                      className="w-full bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all font-sans resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-6 bg-gradient-to-r from-brand-blue to-brand-accent hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 cursor-pointer font-mono"
                  >
                    {editItem
                      ? "UPDATE OPPORTUNITY NODE"
                      : "PUBLISH OPPORTUNITY NODE"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
