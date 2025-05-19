"use client";

import { ModalContainer } from "@/components/shared/modal/modal-container";
import { ModalProvider } from "@/components/shared/modal/modal-provider";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/lib/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ModalProvider>
          {children}
          <ModalContainer />
          <Toaster richColors position="top-right" />
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
