import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { verifySessionToken, getSessionCookieName } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/blog/[id] - Fetch a single blog post
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    // Check if ID is a valid MongoDB ObjectId
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    let post = null;
    if (isValidObjectId) {
      post = await Blog.findById(id);
    }
    if (!post) {
      // Fallback search by slug
      post = await Blog.findOne({ slug: id });
    }

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("GET Single Blog Error:", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

// PUT /api/blog/[id] - Update a blog post (Protected)
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

    // Verify slug uniqueness (excluding current post ID)
    if (cleanSlug) {
      const existing = await Blog.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json(
          { error: "A blog post with this custom URL slug already exists. Please choose a unique title or slug." },
          { status: 400 }
        );
      }
    }

    const updatedPost = await Blog.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("PUT Blog Error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// DELETE /api/blog/[id] - Delete a blog post (Protected)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    const session = token ? verifySessionToken(token) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const deletedPost = await Blog.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("DELETE Blog Error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
