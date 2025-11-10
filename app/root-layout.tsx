// This is the root layout that handles metadata
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Kisah Cinta Abdullah & Nayla",
  description: "Website romantis yang menampilkan kenangan cinta Abdullah & Nayla",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}