"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import VerificationCheck from "@/components/verification-check";
import React from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Always render the VerificationCheck component to ensure consistent structure
  // The VerificationCheck component will internally handle the path-based logic
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <VerificationCheck currentPath={pathname}>
        {children}
      </VerificationCheck>
    </ThemeProvider>
  );
}