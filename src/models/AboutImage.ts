import mongoose, { Schema, Document } from "mongoose";

export interface IAboutImage extends Document {
  src: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutImageSchema: Schema = new Schema(
  {
    src: { type: String, required: true },
  },
  { timestamps: true },
);

if (process.env.NODE_ENV === "development" && mongoose.models.AboutImage) {
  delete mongoose.models.AboutImage;
}

export default mongoose.models.AboutImage ||
  mongoose.model<IAboutImage>("AboutImage", AboutImageSchema);
