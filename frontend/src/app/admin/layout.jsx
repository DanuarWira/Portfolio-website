"use client";
import Sidebar from "@/components/shared/sidebar";
import Topbar from "@/components/shared/topbar";
import { useState, useEffect } from "react";
import withAuth from "@/components/auth/withAuth";

const AdminLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 border-r bg-white">
        <Sidebar />
      </div>

      <main className="flex-grow">
        <Topbar />
        <div className="p-6 bg-gray-50">{children}</div>
      </main>
    </div>
  );
};

export default withAuth(AdminLayout);
