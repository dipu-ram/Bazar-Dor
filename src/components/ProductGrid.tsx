
"use client";

import Link from "next/link";
import {
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";

import type { Product } from "@/types/bazardor";

type ProductGridProps = {
  products: Product[];
  title?: string;
  subtitle?: string;
};

type ProductWithApiFields = Product & {
  slug?: string;
  name?: string;
  nameBn?: string;
  image?: string;
  emoji?: string;
  today?: number | string;
  price?: number | string;
  change?: number | {
    dir?: string;
    pct?: number | string;
  };
  changePercentage?: number | string;
};

export default function ProductGrid({
  products,
  title = "🛒 সব পণ্য",
  subtitle = "নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজারদর দেখুন",
}: ProductGridProps) {
  const formatNumber = (value: number) =>
    value.toLocaleString("bn-BD", {
      maximumFractionDigits: 2,
    });

  const getPrice = (product: Product): number => {
    const item = product as ProductWithApiFields;
    const value = item.today ?? item.price ?? 0;
    const price = Number(value);

    return Number.isFinite(price) ? price : 0;
  };

  const getChange = (product: Product): number => {
    const item = product as ProductWithApiFields;

    if (typeof item.change === "number") {
      return Number.isFinite(item.change) ? item.change : 0;
    }

    if (
      item.change &&
      typeof item.change === "object"
    ) {
      const percentage = Number(item.change.pct ?? 0);

      if (!Number.isFinite(percentage)) return 0;

      if (item.change.dir === "down") {
        return -Math.abs(percentage);
      }

      if (item.change.dir === "up") {
        return Math.abs(percentage);
      }

      return percentage;
    }

    const percentage = Number(item.changePercentage ?? 0);

    return Number.isFinite(percentage) ? percentage : 0;
  };

  const getName = (product: Product): string => {
    const item = product as ProductWithApiFields;

    return item.nameBn || item.name || "পণ্যের নাম নেই";
  };

  const getEmoji = (product: Product): string => {
    const item = product as ProductWithApiFields;

    return item.emoji || item.image || "🛒";
  };

  const getUnit = (product: Product): string => {
    return product.unit || "প্রতি কেজি";
  };

  return (
    <section
      id="সব-পণ্য"
      className="container-main scroll-mt-32 py-10 sm:py-14"
    >
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold text-[#17251c] sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 text-sm text-[#66756b]">
          {subtitle}
        </p>

        <p className="mt-2 text-xs text-[#66756b]">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-[#e4eae4] bg-white p-8 text-center">
          <p className="font-semibold text-[#526158]">
            এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>

          <p className="mt-2 text-sm text-[#66756b]">
            API সংযোগ পরীক্ষা করে কিছুক্ষণ পরে আবার চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const item = product as ProductWithApiFields;
            const name = getName(product);
            const price = getPrice(product);
            const change = getChange(product);

            const isUp = change > 0;
            const isDown = change < 0;
            const isSame = change === 0;

            const slug = item.slug || String(product.id);

            return (
              <article
                key={String(product.id ?? slug)}
                className="rounded-2xl border border-[#e4eae4] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4f8f2] text-3xl">
                    {getEmoji(product)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-[#17251c]">
                      {name}
                    </h3>

                    <p className="mt-1 text-xs text-[#66756b]">
                      {getUnit(product)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#edf1ed] pt-4">
                  <p className="text-xs text-[#66756b]">
                    আজকের দাম
                  </p>

                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#17251c]">
                      {formatNumber(price)}
                    </span>

                    <span className="text-lg font-bold text-[#526158]">
                      টাকা
                    </span>

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
                        ? "০%"
                        : `${formatNumber(Math.abs(change))}%`}
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

                  <Link
                    href={`/product/${slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-[#16794b] hover:underline"
                  >
                    বিস্তারিত দেখুন →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
