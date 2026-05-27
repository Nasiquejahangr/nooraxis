import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nooraxis.vercel.app";

  // 1. Define all static page paths
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/pricing",
    "/careers",
    "/blog",
    "/faq",
    "/terms",
    "/privacy",
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // 2. Fetch dynamic blog posts to include in the sitemap
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    // Fetch only the ID and updatedAt fields to keep the query fast
    const posts = await Blog.find({}, "_id updatedAt").lean();
    
    blogEntries = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post._id}`,
      lastModified: post.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap generation error fetching blog posts:", error);
  }

  return [...staticEntries, ...blogEntries];
}
