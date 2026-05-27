import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services | Nooraxis Technologies",
  description: "Explore dynamic digital engineering at Nooraxis Technologies, including Web Development, SaaS architecture, UI/UX UI styling, and organic SEO services in Purnia, Bihar.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
