import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Nooraxis Technologies Purnia Bihar",
  description: "Learn more about Nooraxis Technologies, an elite boutique design and engineering studio in Purnia, Bihar, India. Explore our principles, mission, and craftsmanship.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
