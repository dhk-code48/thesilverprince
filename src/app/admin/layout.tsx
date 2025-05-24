"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/Admin/admin-sidebar";
import { UseAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const adminClient = new QueryClient();

const AdminPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user, isLogIn } = UseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLogIn) router.push("/novel");

    if (!isLoading && user) {
      if (
        user.uid !== process.env.NEXT_PUBLIC_KEY1 &&
        user.uid !== process.env.NEXT_PUBLIC_KEY2 &&
        user.uid !== process.env.NEXT_PUBLIC_KEY3
      ) {
        router.push("/novel");
      }
    }
  }, [user, isLoading, router, isLogIn]);

  return (
    <QueryClientProvider client={adminClient}>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
      <ReactQueryDevtools client={adminClient} />
    </QueryClientProvider>
  );
};

export default AdminPageLayout;
