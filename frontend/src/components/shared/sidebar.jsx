"use client";
import { useState, useEffect } from "react";
import { LayoutPanelLeft, BookOpenText, BookText, ClipboardList, Star, LogOut } from "lucide-react";
import Menu from "../ui/menu";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutPanelLeft />, path: "/admin/dashboard" },
    { name: "Portfolio", icon: <BookOpenText />, path: "/admin/portfolio" },
    { name: "Article", icon: <BookText />, path: "/admin/article" },
    { name: "Experience", icon: <ClipboardList />, path: "/admin/experience" },
    { name: "Skill", icon: <Star />, path: "/admin/skill" },
  ];

  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <>
      <aside className="flex flex-col justify-between p-6 gap-4 bg-white h-full">
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const IsActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className={`w-full text-left rounded-xl transition-colors duration-200 group ${IsActive ? "bg-primary-50" : "hover:bg-gray-100"}`} onClick={() => setActiveMenu(item.name)}>
                <Menu Text={item.name} Icon={item.icon} IsActive={IsActive} />
              </Link>
            );
          })}
        </div>
        <div>
          <button onClick={handleLogout} className="w-full text-left rounded-xl transition-colors duration-200 group hover:bg-gray-100">
            <Menu Text="Logout" Icon={<LogOut />} IsActive={false} />
          </button>
        </div>
      </aside>
    </>
  );
}
