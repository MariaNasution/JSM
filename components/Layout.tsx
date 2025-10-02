import React from "react";
import Sidebar from "./SidebarAdm";
import { LayoutProps } from "@/types";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
