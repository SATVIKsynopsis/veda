"use client";

import { useRouter } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-20">
      {/* SVG Illustration */}
      <div className="mb-12 relative">
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          className="drop-shadow-lg"
        >
          {/* Background Circle */}
          <circle cx="140" cy="140" r="120" fill="#F0F4FF" opacity="0.8" />

          {/* Magnifying Glass */}
          <circle
            cx="110"
            cy="110"
            r="50"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="8"
          />
          <line
            x1="155"
            y1="155"
            x2="210"
            y2="210"
            stroke="#60A5FA"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Red X Mark */}
          <line
            x1="130"
            y1="120"
            x2="150"
            y2="140"
            stroke="#EF4444"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="150"
            y1="120"
            x2="130"
            y2="140"
            stroke="#EF4444"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Decorative dots */}
          <circle cx="220" cy="80" r="8" fill="#60A5FA" opacity="0.6" />
          <circle cx="240" cy="180" r="6" fill="#A78BFA" opacity="0.5" />
          <circle cx="60" cy="160" r="5" fill="#93C5FD" opacity="0.4" />
        </svg>
      </div>

      {/* Text Content */}
      <div className="text-center mb-10 max-w-xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          No assignments yet
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Create your first assignment to start collecting and grading student
          submissions. You can set up rubrics, define marking criteria, and let
          AI assist with grading.
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => router.push("/create")}
        className="bg-gray-900 text-white font-bold py-4 px-8 rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-base"
      >
        <span className="text-lg">+</span>
        Create Your First Assignment
      </button>
    </div>
  );
}
