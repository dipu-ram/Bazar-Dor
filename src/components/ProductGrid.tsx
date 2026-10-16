
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

type Product = {
  name: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
};

const products: Product[] = [
  { name: "স্বর্ণমাছি চাল", emoji: "🍚", unit: "প্রতি কেজি", price: 148, change: 2.1 },
  { name: "মিনিকেট চাল", emoji: "🍚", unit: "প্রতি কেজি", price: 99, change: -2.9 },
  { name: "নাজির চাল", emoji: "🍚", unit: "প্রতি কেজি", price: 74, change: 0 },
  { name: "বাটাম সাইজ চাল", emoji: "🍚", unit: "প্রতি কেজি", price: 66, change: 3.1 },
  { name: "মসুর ডাল", emoji: "🫘", unit: "প্রতি কেজি", price: 142, change: 2.9 },
  { name: "মুগ ডাল", emoji: "🫘", unit: "প্রতি কেজি", price: 135, change: 0 },
  { name: "ছোলা", emoji: "🫘", unit: "প্রতি কেজি", price: 120, change: -2.4 },
  { name: "আমন ডাল (খোসাসিলা)", emoji: "🫘", unit: "প্রতি কেজি", price: 156, change: 2.6 },
  { name: "সরিষার তেল", emoji: "🫙", unit: "প্রতি লিটার", price: 192, change: 2.1 },
  { name: "পাম তেল", emoji: "🛢️", unit: "প্রতি লিটার", price: 168, change: -2.3 },
  { name: "ঘানি ভাঙা সরিষার তেল", emoji: "🫙", unit: "প্রতি লিটার", price: 215, change: 2.4 },
  { name: "আলু", emoji: "🥔", unit: "প্রতি কেজি", price: 30, change: -6.2 },
  { name: "পেঁয়াজ", emoji: "🧅", unit: "প্রতি কেজি", price: 54, change: 12.5 },
  { name: "কাঁচামরিচ", emoji: "🌶️", unit: "প্রতি কেজি", price: 92, change: -12.4 },
  { name: "বেগুন", emoji: "🍆", unit: "প্রতি কেজি", price: 44, change: 4.8 },
  { name: "ঢেঁড়স", emoji: "🟢", unit: "প্রতি কেজি", price: 38, change: 0 },
  { name: "রুই মাছ", emoji: "🐟", unit: "প্রতি কেজি", price: 46, change: 4.5 },
  { name: "তেলাপিয়া", emoji: "🐟", unit: "প্রতি কেজি", price: 36, change: 0 },
  { name: "ইলিশ মাছ", emoji: "🐠", unit: "প্রতি কেজি", price: 1850, change: 3.4 },
  { name: "কাতলা মাছ", emoji: "🐠", unit: "প্রতি কেজি", price: 43, change: -4.4 },
  { name: "চিংড়ি মাছ (খোলা)", emoji: "🦐", unit: "প্রতি কেজি", price: 330, change: 3.1 },
  { name: "মুরগির মাংস", emoji: "🍗", unit: "প্রতি কেজি", price: 225, change: -1.3 },
  { name: "গরুর মাংস", emoji: "🥩", unit: "প্রতি কেজি", price: 790, change: -1.2 },
  { name: "খাসির মাংস", emoji: "🍖", unit: "প্রতি কেজি", price: 1290, change: -3.0 },
  { name: "হাঁসের মাংস", emoji: "🦆", unit: "প্রতি কেজি", price: 285, change: -3.4 },
  { name: "ডিম", emoji: "🥚", unit: "প্রতি ডজন", price: 158, change: 3.9 },
  { name: "দুধ", emoji: "🥛", unit: "প্রতি লিটার", price: 102, change: 2.0 },
  { name: "দই", emoji: "🥣", unit: "প্রতি কেজি", price: 92, change: 0 },
  { name: "মাখন (১০০ গ্রাম)", emoji: "🧈", unit: "প্রতি পিস", price: 145, change: 3.6 },
  { name: "আদা", emoji: "🫚", unit: "প্রতি কেজি", price: 85, change: 9.0 },
  { name: "রসুন", emoji: "🧄", unit: "প্রতি কেজি", price: 125, change: -7.4 },
  { name: "মরিচ গুঁড়া", emoji: "🌶️", unit: "প্রতি কেজি", price: 245, change: -2.0 },
  { name: "ধনেপাতা গুঁড়া", emoji: "🍃", unit: "প্রতি কেজি", price: 265, change: 0 },
];

export default function ProductGrid() {
  return (
    <section
      id="সব-পণ্য"
      className="container-main scroll-mt-32 py-10 sm:py-14"
    >
      {/* Section Heading */}
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold text-[#17251c] sm:text-3xl">
          🛒 সব পণ্য
        </h2>

        <p className="mt-2 text-sm text-[#66756b]">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const isUp = product.change > 0;
          const isDown = product.change < 0;
          const isSame = product.change === 0;

          return (
            <article
              key={product.name}
              className="rounded-2xl border border-[#e4eae4] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Name */}
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4f8f2] text-3xl">
                  {product.emoji}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-[#17251c]">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#66756b]">
                    {product.unit}
                  </p>
                </div>
              </div>

              {/* Today's Price */}
              <div className="mt-5 border-t border-[#edf1ed] pt-4">
                <p className="text-xs text-[#66756b]">
                  আজকের দাম
                </p>

                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#17251c]">
                    {product.price.toLocaleString("bn-BD")}
                  </span>

                  <span className="text-lg font-bold text-[#526158]">
                    টাকা
                  </span>

                  {/* Price Change */}
                  <span
                    className={`ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp size={14} />
                    ) : isDown ? (
                      <TrendingDown size={14} />
                    ) : (
                      <Minus size={14} />
                    )}

                    {isSame
                      ? "০.০"
                      : Math.abs(product.change).toLocaleString("bn-BD", {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                    %
                  </span>
                </div>

                <p
                  className={`mt-3 text-xs font-semibold ${
                    isUp
                      ? "text-red-600"
                      : isDown
                        ? "text-green-700"
                        : "text-gray-500"
                  }`}
                >
                  {isUp
                    ? "▲ আগের তুলনায় দাম বেড়েছে"
                    : isDown
                      ? "▼ আগের তুলনায় দাম কমেছে"
                      : "— দামের পরিবর্তন নেই"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
