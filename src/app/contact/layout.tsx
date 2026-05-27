import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nooraxis Technologies | +91 9508904653",
  description: "Formulate your custom software ideas. Reach out to our architects in Purnia, Bihar, India to discuss technical parameters, budgets, or contact us at +91 9508904653.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
