
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const categories = [
  { name: "সব পণ্য", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
  { name: "ডিম-দুধ", slug: "dim-dui" },
  { name: "মসলা", slug: "mosla" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        dateStyle: "full",
      }).format(new Date())
    );
  }, []);

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সাইন আউট সম্পন্ন হয়েছে।");
      router.refresh();
      router.push("/");
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4eae4] bg-white">
      <div className="container-main">
        <div className="flex min-h-[76px] items-center justify-between gap-3">
          <div className="min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-extrabold text-[#16794b] sm:text-2xl"
            >
              <span aria-hidden="true">🛒</span>
              <span>বাজার দর</span>
            </Link>

            <p className="mt-1 hidden text-xs text-[#718075] sm:block">
              {date || "বাংলাদেশের বাজারদর"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!isPending &&
              (session ? (
                <>
                  <Link
                    href="/profile"
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-[#16794b] hover:bg-[#eaf6ee] sm:px-4"
                  >
                    প্রোফাইল
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-xl border border-[#e4eae4] px-3 py-2 text-sm font-semibold text-[#526158] hover:bg-[#f7f9f5] sm:px-4"
                  >
                    সাইন আউট
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-[#16794b] hover:bg-[#eaf6ee] sm:px-4"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-xl bg-[#16794b] px-3 py-2 text-sm font-semibold text-white hover:bg-[#105b38] sm:px-4"
                  >
                    সাইন আপ
                  </Link>
                </>
              ))}
          </div>
        </div>
      </div>

      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="border-t border-[#f0f2ef]"
      >
        <div className="container-main">
          <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:thin]">
            {categories.map((category) => {
              const href = category.slug
                ? `/category/${category.slug}`
                : "/";

              const isActive =
                category.slug === ""
                  ? pathname === "/"
                  : pathname === href ||
                    pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={category.slug || "all"}
                  href={href}
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#eaf6ee] text-[#16794b]"
                      : "text-[#526158] hover:bg-[#f4f7f3] hover:text-[#16794b]"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
