"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Package, Image } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: <Home size={20} />, href: "/admin" },
  { name: "Categories", icon: <Users size={20} />, href: "/admin/categories" },
  {
    name: "Subcategories",
    icon: <Users size={20} />,
    href: "/admin/subcategories",
  },
  { name: "Products", icon: <Package size={20} />, href: "/admin/products" },
  { name: "banner", icon: <Image size={20} />, href: "/admin/banner" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 fixed top-0 left-0">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-2 rounded-md transition 
              ${pathname === item.href ? "bg-gray-700" : "hover:bg-gray-800"}
            `}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
