
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
          result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
        );
        return;
      }

      window.location.href = "/signin";
    } catch {
      setError("সার্ভারের সঙ্গে সংযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6faf6] px-4 py-10">
      <div className="mx-auto max-w-md">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-2xl font-extrabold text-[#17251c]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <ShoppingBasket size={25} />
          </span>

          বাজার<span className="text-green-600">দর</span>
        </Link>

        {/* Sign Up Card */}
        <div className="rounded-3xl border border-[#e4eae4] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-extrabold text-[#17251c]">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#66756b]">
              প্রতিদিনের বাজারদর দেখুন এবং বিভিন্ন বাজারের দাম তুলনা করুন।
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
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

            {/* Email */}
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

            {/* Password */}
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
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
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

            {/* Confirm Password */}
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

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e4eae4]" />
            <span className="text-xs text-[#89958c]">অথবা</span>
            <div className="h-px flex-1 bg-[#e4eae4]" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={async () => {
              try {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/",
                });
              } catch {
                setError("Google দিয়ে সাইন আপ করা যায়নি।");
              }
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#dce5dc] bg-white py-3 text-sm font-semibold text-[#17251c] transition hover:bg-[#f6faf6]"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                transform="translate(0 4)"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 37.97 46.98 31.82 46.98 24.55Z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                transform="translate(1 0)"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                transform="translate(0 -2)"
              />
            </svg>

            Google দিয়ে চালিয়ে যান
          </button>

          {/* GitHub Sign Up */}
          <button
            type="button"
            onClick={async () => {
              try {
                await authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/",
                });
              } catch {
                setError("GitHub দিয়ে সাইন আপ করা যায়নি।");
              }
            }}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-[#dce5dc] bg-white py-3 text-sm font-semibold text-[#17251c] transition hover:bg-[#f6faf6]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.22-5.08 5.49.4.35.75 1.02.75 2.06V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
            </svg>

            GitHub দিয়ে চালিয়ে যান
          </button>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-[#66756b]">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-green-700 hover:text-green-800 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back Home */}
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
