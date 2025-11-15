"use client";

import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <Bell className="text-gray-600 cursor-pointer" />
        <UserCircle className="text-gray-600 cursor-pointer" size={28} />
      </div>
    </div>
  );
}
