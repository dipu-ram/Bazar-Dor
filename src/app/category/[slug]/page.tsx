"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface Product {
  id: number | string;
  slug?: string;
  nameBn: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit?: string;
  today: number;
  yesterday?: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

type SortOption = "default" | "price-low" | "price-high";

const categoryNames: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  tel: "তেল",
  sobji: "সবজি",
  mach: "মাছ",
  mangsho: "মাংস",
  "dim-dui": "ডিম-দুধ",
  mosla: "মসলা",
};

async function fetchProducts(slug: string): Promise<Product[]> {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const result: unknown = await response.json();

  let rawProducts: unknown[] = [];

  if (Array.isArray(result)) {
    rawProducts = result;
  } else if (result && typeof result === "object") {
    const root = result as Record<string, unknown>;
    const data = root.data;

    if (Array.isArray(data)) {
      rawProducts = data;
    } else if (data && typeof data === "object") {
      const nested = data as Record<string, unknown>;
      if (Array.isArray(nested.products)) {
        rawProducts = nested.products;
      }
    }
  }

  return rawProducts.filter(
    (item): item is Product =>
      !!item &&
      typeof item === "object" &&
      typeof (item as Product).nameBn === "string" &&
      typeof (item as Product).today === "number"
  );
}

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchProducts(slug);
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sort === "price-low") {
      return list.sort((a, b) => a.today - b.today);
    }

    if (sort === "price-high") {
      return list.sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, sort]);

  const categoryName =
    products[0]?.categoryNameBn || categoryNames[slug] || slug;

  const categoryIcon = products[0]?.categoryIcon || "🛒";

  return (
    <main className="min-h-screen bg-[#f6faf6] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
              {categoryIcon}
            </span>

            <div>
              <h1 className="text-3xl font-extrabold text-[#17251c]">
                {categoryName}
              </h1>
              <p className="mt-1 text-sm text-[#66756b]">
                {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-sm font-semibold text-[#66756b]"
            >
              সাজান
            </label>

            <select
              id="sort"
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortOption)
              }
              className="rounded-xl border border-[#dce5dc] bg-white px-4 py-3 text-sm font-semibold text-[#17251c] outline-none focus:border-green-500"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-[#e4eae4] bg-white px-4 py-3">
          <p className="text-sm text-[#66756b]">
            মোট{" "}
            <span className="font-bold text-[#17251c]">
              {sortedProducts.length.toLocaleString("bn-BD")}টি
            </span>{" "}
            পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-[#e4eae4] bg-white p-10 text-center text-[#66756b]">
            পণ্যের তথ্য লোড হচ্ছে...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-white p-10 text-center">
            <p className="font-bold text-[#17251c]">
              পণ্যের তথ্য লোড করা যায়নি
            </p>
            <p className="mt-2 text-sm text-[#66756b]">
              API বা ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করো।
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#e4eae4] bg-white p-10 text-center">
            <p className="text-lg font-bold text-[#17251c]">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sortedProducts.map((product) => {
              const change =
                product.change ||
                (() => {
                  const yesterday = product.yesterday ?? product.today;
                  const pct =
                    yesterday === 0
                      ? 0
                      : ((product.today - yesterday) / yesterday) * 100;

                  return {
                    dir:
                      product.today > yesterday
                        ? ("up" as const)
                        : product.today < yesterday
                          ? ("down" as const)
                          : ("flat" as const),
                    pct,
                  };
                })();

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug || product.id}`}
                  className="block rounded-2xl border border-[#e4eae4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6faf6] text-3xl">
                    {product.categoryIcon || "🛒"}
                  </div>

                  <h2 className="min-h-14 text-lg font-bold leading-7 text-[#17251c]">
                    {product.nameBn}
                  </h2>

                  <p className="mt-1 text-sm text-[#66756b]">
                    {product.unit === "kg"
                      ? "প্রতি কেজি"
                      : product.unit === "liter"
                        ? "প্রতি লিটার"
                        : product.unit || "প্রতি কেজি"}
                  </p>

                  <div className="mt-5 border-t border-[#edf1ed] pt-4">
                    <p className="text-sm text-[#66756b]">আজকের দাম</p>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-2xl font-extrabold text-[#17251c]">
                        {product.today.toLocaleString("bn-BD")}
                        <span className="ml-1 text-base font-semibold">
                          টাকা
                        </span>
                      </p>

                      <div
                        className={`flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold ${
                          change.dir === "up"
                            ? "bg-red-50 text-red-600"
                            : change.dir === "down"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {change.dir === "up" ? (
                          <ArrowUp size={15} />
                        ) : change.dir === "down" ? (
                          <ArrowDown size={15} />
                        ) : (
                          <Minus size={15} />
                        )}

                        {Math.abs(change.pct).toLocaleString("bn-BD", {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                        %
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl border border-[#dce5dc] bg-white px-5 py-3 text-sm font-semibold text-[#17251c] transition hover:border-green-500 hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}