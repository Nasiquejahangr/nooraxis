import mongoose, { Schema, Document } from "mongoose";

export interface IEnquiry extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    service: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Clear cached model in development to ensure schema updates like 'phone' are compiled
if (process.env.NODE_ENV === "development" && mongoose.models.Enquiry) {
  delete mongoose.models.Enquiry;
}

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
