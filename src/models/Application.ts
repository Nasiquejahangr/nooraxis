import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  portfolioUrl?: string;
  resumeUrl: string;
  message?: string;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    portfolioUrl: { type: String, required: false },
    resumeUrl: { type: String, required: true },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
