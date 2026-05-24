"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("veda_user") || "{}")
      : {};

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 px-2">
          <img
            src="/logo 2.png"
            alt="VedaAI Logo"
            className="h-[70px] w-[70px] object-contain shrink-0 mt-6"
          />

          <h1 className="text-[34px] font-semibold tracking-[-2px] text-[#1F1F1F] leading-none mr-3">
            VedaAI
          </h1>
        </div>
      </div>

      <div className="px-5 py-4">
        <button
          onClick={() => router.push("/create")}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
        >
          <span>✏️</span>
          <span>Create Assignment</span>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
        >
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
        >
          <span className="text-lg">👥</span>
          <span>My Groups</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
        >
          <span className="text-lg">📋</span>
          <span>Assignments</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
        >
          <span className="text-lg">🛠️</span>
          <span>AI Teacher's Toolkit</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
        >
          <span className="text-lg">📚</span>
          <span>My Library</span>
        </Link>
      </nav>

      <div className="border-t border-gray-100 p-4 space-y-3">
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition w-full text-left font-medium text-sm">
          <span className="text-lg">⚙️</span>
          <span>Settings</span>
        </button>

        <div className="mx-2 p-3 border-2 border-orange-200 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              DPS
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-xs leading-tight">
                Delhi Public School
              </p>

              <p className="text-xs text-gray-600 leading-tight">
                Bokaro Steel City
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
