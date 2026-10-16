"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";

import type { Product, SortOption } from "@/types/bazardor";
import ProductCard from "@/components/ProductCard";
import { productName, toNumber } from "@/lib/format";

interface CategoryProductsProps {
  products: Product[];
  categoryName: string;
}

export default function CategoryProducts({
  products,
  categoryName,
}: CategoryProductsProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "asc") {
      result.sort((a, b) => toNumber(a.price) - toNumber(b.price));
    } else if (sort === "desc") {
      result.sort((a, b) => toNumber(b.price) - toNumber(a.price));
    }

    return result;
  }, [products, sort]);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#17251c]">
            {categoryName} পণ্য
          </h2>
          <p className="mt-1 text-sm text-[#66756b]">
            মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য
          </p>
        </div>

        <label className="flex items-center gap-2 self-start rounded-xl border border-[#e4eae4] bg-white px-3 py-2.5 text-sm sm:self-auto">
          <ArrowDownUp size={16} className="text-[#16794b]" />
          <span className="whitespace-nowrap text-[#66756b]">সাজান:</span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="max-w-[180px] bg-transparent font-semibold text-[#17251c] outline-none"
            aria-label="পণ্যের দাম অনুযায়ী সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#d5dfd5] bg-white px-5 py-12 text-center">
          <div className="text-4xl">🧺</div>
          <h3 className="mt-3 font-bold text-[#17251c]">
            এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি
          </h3>
          <p className="mt-2 text-sm text-[#66756b]">
            {categoryName} ক্যাটাগরির পণ্যের তথ্য পরে আবার চেষ্টা করুন।
          </p>
        </div>
      )}
    </section>
  );
}