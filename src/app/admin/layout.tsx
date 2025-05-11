"use client";

import MenuBar from "@/components/Admin/MenuBar";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const adminClient = new QueryClient();

const AdminPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={adminClient}>
      <div>
        <MenuBar label="admin" />
        {children}
      </div>
      <ReactQueryDevtools client={adminClient} />
    </QueryClientProvider>
  );
};

export default AdminPageLayout;
