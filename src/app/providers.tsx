"use client";
import Navbar from "@/components/App/Navbar/Navbar";
import Footer from "@/components/shared/Footer";
import { ModalContainer } from "@/components/shared/modal/modal-container";
import { ModalProvider } from "@/components/shared/modal/modal-provider";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/lib/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";

const publicClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={publicClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ModalProvider>
            <Navbar />
            <main className="lg:pt-20 pb-32 lg:pb-0 min-h-screen">
              {children}
            </main>
            <Footer />
            <ModalContainer />
            <Toaster richColors position="top-right" />
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
