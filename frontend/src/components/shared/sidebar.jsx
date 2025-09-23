"use client";
import { useState } from "react";
import { LayoutPanelLeft, BookOpenText, BookText, ClipboardList, Star } from "lucide-react";
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

  const pathname = usePathname();

  return (
    <>
      <aside className="flex flex-col p-6 gap-4 bg-white">
        {menuItems.map((item) => {
          const IsActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className={`w-full text-left rounded-xl transition-colors duration-200 group ${IsActive ? "bg-primary-50" : "hover:bg-gray-100"}`} onClick={() => setActiveMenu(item.name)}>
              <Menu Text={item.name} Icon={item.icon} IsActive={IsActive} />
            </Link>
          );
        })}
      </aside>
    </>
  );
}
