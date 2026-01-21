import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sathish Lella | AI Solutions Architect",
  description: "AI Solutions Engineer & Data Specialist targeting Dubai 2031 Vision. Expert in Arabic NLP, MLOps, Predictive Analytics, and Healthcare AI.",
  keywords: [
    "AI Solutions Architect",
    "Arabic NLP",
    "MLOps",
    "Data Scientist",
    "Dubai AI",
    "Smart City Analytics",
    "Predictive Maintenance",
    "Healthcare AI",
    "LangChain",
    "GPT-4",
    "UAE",
  ],
  authors: [{ name: "Sathish Lella" }],
  openGraph: {
    title: "Sathish Lella | AI Solutions Architect",
    description: "AI Solutions Engineer & Data Specialist - Dubai 2031 Vision",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathish Lella | AI Solutions Architect",
    description: "AI Solutions Engineer & Data Specialist - Dubai 2031 Vision",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
