import mongoose, { Schema, Document } from "mongoose";

export interface ISetting extends Document {
  phone: string;
  email: string;
  address: string;
  registrationDate: string;
  whatsapp: string;
}

const SettingSchema: Schema = new Schema(
  {
    phone: { type: String, default: "+91 9508904653" },
    email: { type: String, default: "nasiquejahangir000@gmail.com" },
    address: { type: String, default: "Madhopara Islam Nagar Purnia" },
    registrationDate: { type: String, default: "21 May 2026" },
    whatsapp: { type: String, default: "919508904653" },
  },
  { timestamps: true },
);

// Prevent model recompilation in dev
if (process.env.NODE_ENV === "development" && mongoose.models.Setting) {
  delete mongoose.models.Setting;
}

export default mongoose.models.Setting ||
  mongoose.model<ISetting>("Setting", SettingSchema);
