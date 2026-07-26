import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function generateMetadata(): Promise<Metadata> {
  await connectToDatabase();
  const setting = await Setting.findOne({});
  const phone = setting?.phone || "+91 9508904653";

  return {
    title: `Contact | Nooraxis Technologies | ${phone}`,
    description: `Formulate your custom software ideas. Reach out to our architects in Purnia, Bihar, India to discuss technical parameters, budgets, or contact us at ${phone}.`,
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
