"use client";

export default function HomePage() {
  return (
    <div className="flex h-full min-h-screen items-center justify-center rounded-[32px] border border-[#ECECEC] bg-white">
      <div className="flex flex-col items-center">
        <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#F5F5F5]">
          <span className="text-[40px]">🏠</span>
        </div>

        <h1 className="mt-8 text-[42px] font-semibold tracking-[-1px] text-[#232323]">
          Home
        </h1>

        <p className="mt-5 text-center text-[18px] text-[#7B7B7B]">
          Currently focused on shipping features teachers actually use ✨
        </p>
      </div>
    </div>
  );
}
