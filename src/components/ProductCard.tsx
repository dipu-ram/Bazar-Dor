import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import type { Product } from "@/types/bazardor";
import {
  bnNumber,
  productChange,
  productEmoji,
  productName,
  toNumber,
} from "@/lib/format";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const change = productChange(product);
  const price = toNumber(product.price);
  const productId = product.slug || String(product.id);

  const badgeStyle =
    change > 0
      ? "bg-red-50 text-red-700"
      : change < 0
        ? "bg-emerald-50 text-emerald-700"
        : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${encodeURIComponent(productId)}`}
      className="group flex h-full flex-col rounded-2xl border border-[#e4eae4] bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#b9dec6] hover:shadow-lg sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-[#f1f7f1] text-4xl transition group-hover:bg-[#e5f5eb] sm:h-[88px] sm:w-[88px] sm:text-5xl">
          {productEmoji(product)}
        </div>

        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-bold ${badgeStyle}`}
        >
          {change > 0 ? (
            <ArrowUpRight size={14} />
          ) : change < 0 ? (
            <ArrowDownRight size={14} />
          ) : (
            <Minus size={14} />
          )}
          {bnNumber(Math.abs(change))}%
        </span>
      </div>

      <h3 className="mt-4 line-clamp-2 text-base font-extrabold text-[#17251c] transition group-hover:text-[#16794b] sm:text-lg">
        {productName(product)}
      </h3>

      <p className="mt-1 text-xs text-[#718076]">
        {product.unit || "প্রতি একক"}
      </p>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-end justify-between gap-2 border-t border-dashed border-[#e4eae4] pt-4">
          <div>
            <p className="text-xs text-[#718076]">আজকের দাম</p>
            <p className="mt-1 text-xl font-extrabold text-[#16794b]">
              {bnNumber(price)}
              <span className="ml-1 text-xs font-semibold">টাকা</span>
            </p>
          </div>

          <span className="text-xs font-bold text-[#16794b] transition group-hover:translate-x-1">
            বিস্তারিত →
          </span>
        </div>
      </div>
    </Link>
  );
}