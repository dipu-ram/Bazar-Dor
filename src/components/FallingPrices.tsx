
import { TrendingDown } from "lucide-react";

const products = [
  {
    name: "কাঁচামরিচ",
    emoji: "🌶️",
    unit: "প্রতি কেজি",
    price: 92,
    change: 12.4,
  },
  {
    name: "রসুন",
    emoji: "🧄",
    unit: "প্রতি কেজি",
    price: 125,
    change: 7.4,
  },
  {
    name: "আলু",
    emoji: "🥔",
    unit: "প্রতি কেজি",
    price: 30,
    change: 6.2,
  },
  {
    name: "কাতলা মাছ",
    emoji: "🐠",
    unit: "প্রতি কেজি",
    price: 43,
    change: 4.4,
  },
  {
    name: "হাঁসের মাংস",
    emoji: "🦆",
    unit: "প্রতি কেজি",
    price: 285,
    change: 3.4,
  },
  {
    name: "খাসির মাংস",
    emoji: "🍖",
    unit: "প্রতি কেজি",
    price: 1290,
    change: 3.0,
  },
];

export default function FallingPrices() {
  return (
    <section className="container-main py-10 sm:py-14">
      {/* Section Heading */}
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
          <TrendingDown size={25} />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-[#17251c] sm:text-3xl">
            আজ দাম কমেছে
          </h2>

          <p className="mt-1 text-sm text-[#66756b]">
            যেসব পণ্যের দাম আগের তুলনায় কমেছে
          </p>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.name}
            className="rounded-2xl border border-[#e4eae4] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Product Name and Price Change */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4f8f2] text-3xl">
                  {product.emoji}
                </div>

                <div>
                  <h3 className="font-bold text-[#17251c]">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#66756b]">
                    {product.unit}
                  </p>
                </div>
              </div>

              {/* Percentage */}
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                <TrendingDown size={14} />

                {product.change.toLocaleString("bn-BD", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
                %
              </span>
            </div>

            {/* Today's Price */}
            <div className="mt-5 border-t border-[#edf1ed] pt-4">
              <p className="text-xs text-[#66756b]">
                আজকের দাম
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#17251c]">
                  {product.price.toLocaleString("bn-BD")}
                </span>

                <span className="text-lg font-bold text-[#526158]">
                  ৳
                </span>

                <span className="text-sm font-semibold text-[#526158]">
                  টাকা
                </span>
              </div>

              {/* Price Decrease Label */}
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-green-700">
                <TrendingDown size={15} />
                আগের তুলনায় দাম কমেছে
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
