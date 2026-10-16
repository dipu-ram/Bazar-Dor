
"use client";

import type { Product } from "@/types/bazardor";
import {
  bnNumber,
  productChange,
  productEmoji,
  productName,
  productUnit,
  toNumber,
} from "@/lib/format";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  if (!products.length) return null;

  const tickerProducts = [...products, ...products];

  return (
    <div
      className="overflow-hidden border-y border-[#dce9dd] bg-[#edf8ef] text-[#183c28]"
      aria-label="পণ্যের চলমান বাজারদর"
    >
      <div className="flex min-h-12 items-center">
        <div className="z-10 flex h-12 shrink-0 items-center bg-[#16794b] px-4 text-sm font-bold text-white shadow-md">
          <span className="mr-2">📢</span>
          বাজারদর
        </div>

        <div className="ticker-viewport min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center">
            {tickerProducts.map((product, index) => {
              const change = productChange(product);
              const price = toNumber(product.price);
              const isUp = change >= 0;

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex shrink-0 items-center gap-2 border-r border-[#d4e5d6] px-5 py-2"
                >
                  <span className="text-xl" aria-hidden="true">
                    {productEmoji(product)}
                  </span>

                  <span className="whitespace-nowrap text-sm font-semibold">
                    {productName(product)}
                  </span>

                  <span className="whitespace-nowrap text-sm font-bold">
                    {bnNumber(price)} টাকা/{productUnit(product)}
                  </span>

                  <span
                    className={`whitespace-nowrap rounded-md px-2 py-1 text-xs font-bold ${
                      isUp
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isUp ? "▲" : "▼"} {bnNumber(Math.abs(change))}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
