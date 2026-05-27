import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

// GET /api/blog - Fetch all blog posts
export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET Blog Error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

// POST /api/blog - Create a new blog post (Protected)
export async function POST(request: Request) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();
    const { 
      title, 
      excerpt, 
      content, 
      category, 
      author, 
      date, 
      image, 
      featured,
      slug,
      readTime,
      authorRole,
      authorAvatar
    } = body;

    if (!title || !excerpt || !content || !category || !author || !date || !image) {
      return NextResponse.json(
        { error: "Title, excerpt, content, category, author, date, and image are required" },
        { status: 400 }
      );
    }

    // Clean or generate slug
    const cleanSlug = (slug && slug.trim())
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    // Verify slug uniqueness
    if (cleanSlug) {
      const existing = await Blog.findOne({ slug: cleanSlug });
      if (existing) {
        return NextResponse.json(
          { error: "A blog post with this custom URL slug already exists. Please choose a unique title or slug." },
          { status: 400 }
        );
      }
    }

    const newPost = await Blog.create({
      title,
      excerpt,
      content,
      category,
      author,
      date,
      image,
      featured: !!featured,
      slug: cleanSlug,
      readTime: readTime || "5 MIN READ",
      authorRole: authorRole || "Technical Writer",
      authorAvatar: authorAvatar || "AM",
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("POST Blog Error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
