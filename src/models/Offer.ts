import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  text: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    buttonText: { type: String, default: "Call Now" },
    buttonLink: { type: String, default: "tel:+919508904653" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);
