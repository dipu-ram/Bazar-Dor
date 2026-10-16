
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBasket,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(
          result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      window.location.href = "/signin";
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যাচ্ছে না।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6faf6] px-4 py-10">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-2xl font-extrabold text-[#17251c]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <ShoppingBasket size={25} />
          </span>
          বাজার<span className="text-green-600">দর</span>
        </Link>

        <div className="rounded-3xl border border-[#e4eae4] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-extrabold text-[#17251c]">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#66756b]">
              প্রতিদিনের বাজারদর দেখুন এবং বিভিন্ন বাজারের দাম তুলনা করুন।
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#17251c]"
              >
                আপনার নাম
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89958c]"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="আপনার পুরো নাম"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#dce5dc] bg-white py-3 pl-10 pr-4 text-sm text-[#17251c] outline-none transition placeholder:text-[#a0aaa2] focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#17251c]"
              >
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89958c]"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#dce5dc] bg-white py-3 pl-10 pr-4 text-sm text-[#17251c] outline-none transition placeholder:text-[#a0aaa2] focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#17251c]"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89958c]"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#dce5dc] bg-white py-3 pl-10 pr-11 text-sm text-[#17251c] outline-none transition placeholder:text-[#a0aaa2] focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="পাসওয়ার্ড দেখান বা লুকান"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89958c] hover:text-green-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-[#17251c]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89958c]"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="আবার পাসওয়ার্ড লিখুন"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#dce5dc] bg-white py-3 pl-10 pr-4 text-sm text-[#17251c] outline-none transition placeholder:text-[#a0aaa2] focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e4eae4]" />
            <span className="text-xs text-[#89958c]">অথবা</span>
            <div className="h-px flex-1 bg-[#e4eae4]" />
          </div>

          <p className="text-center text-sm text-[#66756b]">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-green-700 hover:text-green-800 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-[#66756b] transition hover:text-green-700"
        >
          <ArrowLeft size={16} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
