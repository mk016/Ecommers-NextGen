"use client";

import { Bell, UserCircle } from "lucide-react";

export default function login() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6 fixed w-[calc(100%-16rem)] left-64 top-0 z-10">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <Bell className="text-gray-600 cursor-pointer" />
        <UserCircle className="text-gray-600 cursor-pointer" size={28} />
      </div>
    </div>
  );
}
