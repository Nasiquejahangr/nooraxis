import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  type: string;
  location: string;
  dept: string;
  description?: string;
  category?: string;
  createdAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    dept: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true, default: "Job", enum: ["Job", "Intern"] },
  },
  { timestamps: true }
);

// Clear cached model in development to ensure schema updates like 'category' are compiled
if (process.env.NODE_ENV === "development" && mongoose.models.Job) {
  delete mongoose.models.Job;
}

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
