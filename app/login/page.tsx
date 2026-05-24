"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = async () => {
    const response = await fetch("/api/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("veda_user", JSON.stringify(data.user));

      router.push("/assignments");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F4F4] px-4">
      <div className="w-full max-w-[520px] rounded-[40px] bg-white p-10 shadow-sm border border-[#ECECEC]">
        <div className="mb-10">
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

          <h2 className="mt-10 text-[42px] font-semibold leading-[48px] text-[#232323]">
            Welcome Back
          </h2>

          <p className="mt-3 text-[16px] text-[#8A8A8A]">
            Login to continue your AI workflow.
          </p>
        </div>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[58px] w-full rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-6 text-[#232323] outline-none placeholder:text-[#B0B0B0] focus:border-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[58px] w-full rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-6 text-[#232323] outline-none placeholder:text-[#B0B0B0] focus:border-black"
          />

          <button
            onClick={login}
            className="mt-2 h-[58px] w-full rounded-full bg-[#1E1E1E] text-[16px] font-medium text-white transition hover:opacity-90"
          >
            Login
          </button>
        </div>

        <p className="mt-8 text-center text-[15px] text-[#8A8A8A]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-[#232323]">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
