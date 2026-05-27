import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  featured: boolean;
  slug?: string;
  readTime?: string;
  authorRole?: string;
  authorAvatar?: string;
  createdAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true }, // Gradient class or Image URL
    featured: { type: Boolean, default: false },
    slug: { type: String, unique: true, sparse: true },
    readTime: { type: String },
    authorRole: { type: String },
    authorAvatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
