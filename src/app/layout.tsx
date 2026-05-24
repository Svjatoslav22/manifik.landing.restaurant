import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manifik Restaurant | Modern European Cuisine in Sambir",
  description: "Experience exquisite European cuisine at Manifik Restaurant in Sambir. Fine dining, elegant atmosphere, and exceptional service. Reserve your table today.",
  keywords: ["restaurant", "European cuisine", "Sambir", "fine dining", "Manifik", "Ukraine"],
  openGraph: {
    title: "Manifik Restaurant | Modern European Cuisine",
    description: "Experience exquisite European cuisine in an elegant atmosphere where every dish tells a story.",
    type: "website",
    locale: "en_US",
    siteName: "Manifik Restaurant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manifik Restaurant",
    description: "Modern European Cuisine in Sambir",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal-900">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
