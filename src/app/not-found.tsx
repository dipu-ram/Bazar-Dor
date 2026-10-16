import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container-main flex min-h-[60vh] items-center justify-center py-12">
      <div className="w-full max-w-lg rounded-3xl border border-[#e4eae4] bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="text-6xl">🔎</div>

        <p className="mt-5 text-sm font-extrabold tracking-widest text-[#16794b]">
          ERROR 404
        </p>

        <h1 className="mt-3 text-2xl font-extrabold text-[#17251c] sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-7 text-[#66756b]">
          তুমি যে পেজ বা পণ্যটি খুঁজছ, সেটি পাওয়া যায়নি অথবা ঠিকানাটি
          পরিবর্তন হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#16794b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#105b38]"
        >
          <ArrowLeft size={17} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}