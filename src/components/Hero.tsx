
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export default function Hero() {
  const today = getBanglaDate();

  return (
    <section className="overflow-hidden bg-[#eaf6ee]">
      <div className="container-main grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
        {/* বাম পাশে লেখা */}
        <div>
          <p className="mb-5 text-sm font-semibold text-[#66756b]">
            {today}
          </p>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#cfe8d6] bg-white px-3 py-1.5 text-xs font-bold text-[#16794b] sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#2caa69]" />
            বাংলাদেশের নিত্যপ্রয়োজনীয় বাজারদর
          </div>

          <h1 className="max-w-2xl text-4xl leading-[1.2] font-extrabold tracking-tight text-[#17251c] sm:text-5xl lg:text-6xl">
            আজকের বাজারের দাম
            <span className="mt-2 block text-[#16794b]">
              এক নজরে
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#526158] sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-8">
            <Link
              href="#সব-পণ্য"
              className="inline-flex items-center gap-2 rounded-xl bg-[#16794b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#16794b]/15 transition hover:-translate-y-0.5 hover:bg-[#105b38]"
            >
              সব পণ্য দেখুন
              <ArrowDown size={18} />
            </Link>
          </div>

          <p className="mt-5 text-xs leading-5 text-[#718076]">
            বাজারদর পরিবর্তনশীল। কেনার আগে স্থানীয় বাজারে দাম যাচাই করুন।
          </p>
        </div>

        {/* ডান পাশে শুধু বড় লোগো */}
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center sm:max-w-lg">
          <div className="absolute h-72 w-72 rounded-full bg-[#cfe8d6] blur-3xl sm:h-96 sm:w-96" />

          <div className="relative flex h-80 w-full items-center justify-center sm:h-[440px]">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের ঝুড়ি লোগো"
              width={500}
              height={500}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
