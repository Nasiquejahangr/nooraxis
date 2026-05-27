import mongoose, { Schema, Document } from "mongoose";

export interface IPortfolio extends Document {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  image: string;
  externalLink?: string;
  codeLink?: string;
  createdAt: Date;
}

const PortfolioSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: true }, // Gradient class or Image URL
    externalLink: { type: String, default: "" },
    codeLink: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
