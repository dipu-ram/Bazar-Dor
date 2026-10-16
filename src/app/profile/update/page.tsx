
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBasket,
  UserRound,
  Mail,
  ArrowLeft,
  LogOut,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Rezwan Ahmed");
  const [email, setEmail] = useState("rezwanahmed@gmail.com");
  const [message, setMessage] = useState("");

  function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("তথ্য আপডেট করার ফর্মটি প্রস্তুত।");
  }

  function handleSignOut() {
    // Better Auth-এর sign-out action এখানে যুক্ত করতে হবে।
    window.location.href = "/signin";
  }

  return (
    <main className="min-h-screen bg-[#f6faf6] px-4 py-10">
      <div className="mx-auto max-w-2xl">
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

        {/* Profile Card */}
        <section className="overflow-hidden rounded-3xl border border-[#e4eae4] bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-[#e4eae4] px-6 py-7 sm:px-8">
            <h1 className="text-2xl font-extrabold text-[#17251c]">
              আমার প্রোফাইল
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#66756b]">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          {/* User Information */}
          <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <UserRound size={32} />
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold text-[#17251c]">
                  {name || "আপনার নাম"}
                </h2>
                <p className="mt-1 break-all text-sm text-[#66756b]">
                  {email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:self-center"
            >
              <LogOut size={17} />
              সাইন আউট
            </button>
          </div>

          {/* Edit Information */}
          <div className="border-t border-[#e4eae4] px-6 py-7 sm:px-8">
            <h3 className="text-lg font-bold text-[#17251c]">তথ্য</h3>
            <p className="mt-1 text-sm text-[#66756b]">
              আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন।
            </p>

            <form onSubmit={handleUpdate} className="mt-6 space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#17251c]"
                >
                  নাম
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
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="আপনার নাম লিখুন"
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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-[#dce5dc] bg-white py-3 pl-10 pr-4 text-sm text-[#17251c] outline-none transition placeholder:text-[#a0aaa2] focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              {/* Feedback */}
              {message && (
                <p
                  role="status"
                  className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  {message}
                </p>
              )}

              {/* Update Button */}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Save size={18} />
                আপডেট
              </button>
            </form>
          </div>
        </section>

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
