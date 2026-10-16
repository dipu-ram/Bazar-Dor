
import Link from "next/link";
import { ShoppingBasket, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#e4eae4] bg-white text-[#17251c]">
      <div className="container-main py-8 sm:py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo and Description */}
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-extrabold text-[#17251c] transition hover:text-green-600"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <ShoppingBasket size={23} />
              </span>

              <span>
                বাজার<span className="text-green-600">দর</span>
              </span>
            </Link>

            <p className="mt-3 text-sm text-[#66756b]">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Back to Top */}
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-[#e4eae4] bg-[#f8faf7] px-4 py-2.5 text-sm font-semibold text-[#17251c] transition hover:border-green-500 hover:text-green-700"
          >
            উপরে যান
            <ArrowUp size={16} />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-7 border-t border-[#e4eae4] pt-5">
         

          
        </div>
      </div>
    </footer>
  );
}
