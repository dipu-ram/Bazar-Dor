
import { TrendingUp } from "lucide-react";

const products = [
  {
    name: "পেঁয়াজ",
    emoji: "🧅",
    unit: "প্রতি কেজি",
    price: 54,
    change: 12.5,
  },
  {
    name: "আদা",
    emoji: "🫚",
    unit: "প্রতি কেজি",
    price: 85,
    change: 9.0,
  },
  {
    name: "বেগুন",
    emoji: "🍆",
    unit: "প্রতি কেজি",
    price: 44,
    change: 4.8,
  },
  {
    name: "রুই মাছ",
    emoji: "🐟",
    unit: "প্রতি কেজি",
    price: 460,
    change: 4.5,
  },
  {
    name: "ডিম",
    emoji: "🥚",
    unit: "প্রতি ডজন",
    price: 158,
    change: 3.9,
  },
  {
    name: "মাখন (১০০ গ্রাম)",
    emoji: "🧈",
    unit: "প্রতি পিস",
    price: 145,
    change: 3.6,
  },
];

export default function RisingPrices() {
  return (
    <section className="container-main py-10 sm:py-14">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <TrendingUp size={25} />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-[#17251c] sm:text-3xl">
            আজ দাম বেড়েছে
          </h2>
          <p className="mt-1 text-sm text-[#66756b]">
            যেসব পণ্যের দাম বেড়েছে
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.name}
            className="rounded-2xl border border-[#e4eae4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
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

              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                ▲ {product.change.toLocaleString("bn-BD")}%
              </span>
            </div>

            <div className="mt-5 border-t border-[#edf1ed] pt-4">
              <p className="text-xs text-[#66756b]">
                আজকের দাম
              </p>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#17251c]">
                  {product.price.toLocaleString("bn-BD")}
                </span>
                <span className="text-sm font-semibold text-[#526158]">
                  টাকা
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-red-600">
                <TrendingUp size={15} />
                আগের তুলনায় দাম বেড়েছে
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
