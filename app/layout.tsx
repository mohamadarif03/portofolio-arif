import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arif — Web Developer & Data Enthusiast",
  description:
    "Portofolio Arif: Web Developer dan Data Enthusiast yang membangun solusi digital dengan React, Golang, Laravel, dan Data Science.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
