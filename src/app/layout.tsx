import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AnnouncementBar from "@/components/AnnouncementBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nooraxis Technologies | Web Development & Digital Solutions | Purnia, Bihar",
  description: "Nooraxis Technologies - Professional web development, software solutions, digital marketing & UI/UX design services in Purnia, Bihar, India. MSME Registered Company.",
  verification: {
    google: "zMJB-JEKvVOX1KTSo5_Sm5QtOOGxZaqGbvb3jNjaWhI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased text-foreground bg-background" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow layout-main">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
          <SpeedInsights />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
