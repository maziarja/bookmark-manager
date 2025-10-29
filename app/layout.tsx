import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmark Manager",
  description:
    "The Bookmark Manager app helps users efficiently organize and access their favorite websites. It provides an intuitive and responsive interface that allows users to add, manage, and explore bookmarks with ease.",
};

const manrope = Manrope({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${manrope.className}`}>{children}</body>
    </html>
  );
}
