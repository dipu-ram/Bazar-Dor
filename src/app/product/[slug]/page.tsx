
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Minus,
} from "lucide-react";

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

interface Market {
  name: string;
  division: string;
  min: number;
  max: number;
  average: number;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

const categoryIcons: Record<string, string> = {
  chal: "🍚",
  dal: "🫘",
  tel: "🫗",
  sobji: "🥬",
  mach: "🐟",
  mangsho: "🍗",
  "dim-dui": "🥚",
  mosla: "🌶️",
};

const markets: Market[] = [
  { name: "মাঠ বাজার", division: "ময়মনসিংহ", min: 59, max: 65, average: 62 },
  { name: "সদর বাজার", division: "রাজশাহী", min: 60, max: 66, average: 63 },
  { name: "বাজারহাট", division: "খুলনা", min: 60, max: 67, average: 63.5 },
  { name: "বাসারহাট বাজার", division: "রাজশাহী", min: 60, max: 68, average: 64 },
  { name: "চৌর বাজার", division: "ময়মনসিংহ", min: 60, max: 69, average: 64.5 },
  { name: "আমতলী বাজার", division: "চট্টগ্রাম", min: 61, max: 69, average: 65 },
  { name: "ডবলগেট বাজার", division: "খুলনা", min: 62, max: 69, average: 65.5 },
  { name: "চৌরাস্তা বাজার", division: "সিলেট", min: 63, max: 71, average: 67 },
  { name: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: 64, max: 71, average: 67.5 },
  { name: "চৌদগ্রাম বাজার", division: "চট্টগ্রাম", min: 63, max: 73, average: 68 },
  { name: "আমবাজার", division: "সিলেট", min: 64, max: 73, average: 68.5 },
  { name: "কারওয়ান বাজার", division: "ঢাকা", min: 65, max: 73, average: 69 },
];

function money(value: number) {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function extractProducts(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }

  if (!isRecord(value)) {
    return [];
  }

  for (const key of ["products", "data", "result", "items"]) {
    const nested = value[key];

    if (Array.isArray(nested)) {
      return nested.filter(isRecord);
    }

    if (isRecord(nested)) {
      const found = extractProducts(nested);

      if (found.length > 0) {
        return found;
      }
    }
  }

  return [];
}

function normaliseProduct(
  raw: Record<string, unknown>,
  fallbackId: string
): Product | null {
  const nameBn =
    typeof raw.nameBn === "string"
      ? raw.nameBn
      : typeof raw.name === "string"
        ? raw.name
        : null;

  const today =
    typeof raw.today === "number"
      ? raw.today
      : typeof raw.price === "number"
        ? raw.price
        : null;

  if (nameBn === null || today === null) {
    return null;
  }

  let change: Product["change"];

  if (isRecord(raw.change)) {
    const dir = raw.change.dir;
    const pct = raw.change.pct;

    if (
      (dir === "up" || dir === "down" || dir === "flat") &&
      typeof pct === "number"
    ) {
      change = { dir, pct };
    }
  }

  return {
    id:
      typeof raw.id === "number" || typeof raw.id === "string"
        ? raw.id
        : typeof raw._id === "string"
          ? raw._id
          : fallbackId,
    slug: typeof raw.slug === "string" ? raw.slug : undefined,
    nameBn,
    category:
      typeof raw.category === "string" ? raw.category : "chal",
    categoryNameBn:
      typeof raw.categoryNameBn === "string"
        ? raw.categoryNameBn
        : undefined,
    categoryIcon:
      typeof raw.categoryIcon === "string"
        ? raw.categoryIcon
        : undefined,
    unit: typeof raw.unit === "string" ? raw.unit : "kg",
    today,
    yesterday:
      typeof raw.yesterday === "number"
        ? raw.yesterday
        : undefined,
    change,
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    // প্রথমে বিস্তারিত endpoint-এ slug দিয়ে চেষ্টা
    const detailResponse = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (detailResponse.ok) {
      const detailResult: unknown = await detailResponse.json();

      const detailProducts = extractProducts(detailResult);
      const detailCandidates = [
        ...(isRecord(detailResult) ? [detailResult] : []),
        ...detailProducts,
      ];

      for (const candidate of detailCandidates) {
        const product = normaliseProduct(candidate, slug);

        if (product) {
          return {
            ...product,
            slug:
              product.slug ??
              (typeof candidate.slug === "string"
                ? candidate.slug
                : slug),
          };
        }
      }

      if (isRecord(detailResult)) {
        let current: Record<string, unknown> = detailResult;

        for (let i = 0; i < 4; i++) {
          const nested = current.data ?? current.product;

          if (!isRecord(nested)) break;

          const product = normaliseProduct(nested, slug);

          if (product) {
            return {
              ...product,
              slug:
                product.slug ??
                (typeof nested.slug === "string"
                  ? nested.slug
                  : slug),
            };
          }

          current = nested;
        }
      }
    }

    // বিস্তারিত endpoint কাজ না করলে তালিকা থেকে slug মিলিয়ে দেখা
    const listResponse = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { cache: "no-store" }
    );

    if (!listResponse.ok) {
      console.error("Products list API error:", listResponse.status);
      return null;
    }

    const listResult: unknown = await listResponse.json();
    const products = extractProducts(listResult);

    const raw = products.find((item) => {
      const itemSlug = String(item.slug ?? "");
      const itemId = String(item.id ?? item._id ?? "");

      return itemSlug === slug || itemId === slug;
    });

    if (!raw) {
      console.error("Product slug/ID not found:", slug, listResult);
      return null;
    }

    return normaliseProduct(raw, slug);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f6faf6] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#e4eae4] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-[#17251c]">
            পণ্যটি পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#66756b]">
            এই পণ্যের তথ্য API থেকে পাওয়া যায়নি। API response,
            product slug এবং দাম যাচাই করতে হবে।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const currentChange =
    product.change ??
    (product.yesterday !== undefined
      ? {
          dir:
            product.today > product.yesterday
              ? ("up" as const)
              : product.today < product.yesterday
                ? ("down" as const)
                : ("flat" as const),
          pct:
            product.yesterday === 0
              ? 0
              : ((product.today - product.yesterday) /
                  product.yesterday) *
                100,
        }
      : { dir: "flat" as const, pct: 0 });

  const difference =
    product.yesterday !== undefined
      ? Math.abs(product.today - product.yesterday)
      : Math.round(
          (product.today * Math.abs(currentChange.pct)) / 100
        );

  const categoryName =
    product.categoryNameBn ??
    categoryNames[product.category] ??
    "অন্যান্য";

  const categoryIcon =
    product.categoryIcon ??
    categoryIcons[product.category] ??
    "🛒";

  const minPrice = Math.min(...markets.map((market) => market.min));
  const maxPrice = Math.max(...markets.map((market) => market.max));

  const averagePrice =
    markets.reduce((total, market) => total + market.average, 0) /
    markets.length;

  const unitLabel =
    product.unit === "kg"
      ? "প্রতি কেজি"
      : product.unit === "liter"
        ? "প্রতি লিটার"
        : product.unit || "প্রতি কেজি";

  return (
    <main className="min-h-screen bg-[#f6faf6] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#66756b]">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {categoryName}
          </Link>

          <span>/</span>

          <span className="font-semibold text-[#17251c]">
            {product.nameBn}
          </span>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-[#e4eae4] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-5xl">
              {categoryIcon}
            </div>

            <p className="mt-6 text-sm font-semibold text-green-700">
              আজকের দাম
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-[#17251c] sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-sm text-[#66756b]">
              {categoryIcon} {unitLabel} · {categoryName}
            </p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-extrabold text-[#17251c]">
                  {money(product.today)}
                  <span className="ml-2 text-lg font-semibold">
                    টাকা
                  </span>
                </p>

                <p className="mt-2 text-sm text-[#66756b]">
                  টাকা / {product.unit === "liter" ? "লিটার" : "কেজি"}
                </p>
              </div>

              <div
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold ${
                  currentChange.dir === "up"
                    ? "bg-red-50 text-red-600"
                    : currentChange.dir === "down"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {currentChange.dir === "up" ? (
                  <ArrowUp size={16} />
                ) : currentChange.dir === "down" ? (
                  <ArrowDown size={16} />
                ) : (
                  <Minus size={16} />
                )}

                {money(Math.abs(currentChange.pct))}%
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#f6faf6] p-4">
              <p className="text-sm leading-6 text-[#66756b]">
                {currentChange.dir === "up"
                  ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${money(difference)} টাকা`
                  : currentChange.dir === "down"
                    ? `গতকালের তুলনায় আজ দাম কমেছে · ${money(difference)} টাকা`
                    : "গতকালের তুলনায় আজ দামের কোনো পরিবর্তন নেই"}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e4eae4] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-extrabold text-[#17251c]">
              দামের সারসংক্ষেপ
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-sm text-[#66756b]">সর্বনিম্ন দাম</p>
                <p className="mt-2 text-2xl font-extrabold text-green-700">
                  {money(minPrice)} টাকা
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4">
                <p className="text-sm text-[#66756b]">সর্বাধিক দাম</p>
                <p className="mt-2 text-2xl font-extrabold text-red-600">
                  {money(maxPrice)} টাকা
                </p>
              </div>

              <div className="rounded-2xl bg-[#f6faf6] p-4">
                <p className="text-sm text-[#66756b]">গড় দাম</p>
                <p className="mt-2 text-2xl font-extrabold text-[#17251c]">
                  {money(averagePrice)} টাকা
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-[#e4eae4] pt-5">
              <p className="text-sm text-[#66756b]">
                <span className="font-semibold text-[#17251c]">
                  সবচেয়ে কম দামের বাজার:
                </span>{" "}
                মাঠ বাজার
              </p>

              <p className="text-sm text-[#66756b]">
                <span className="font-semibold text-[#17251c]">
                  সবচেয়ে বেশি দামের বাজার:
                </span>{" "}
                চৌদগ্রাম বাজার / আমবাজার / কারওয়ান বাজার
              </p>

              <p className="text-xs text-[#89958c]">
                {unitLabel}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#e4eae4] bg-white shadow-sm">
          <div className="border-b border-[#e4eae4] p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-[#17251c]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-2 text-sm text-[#66756b]">
              বিভিন্ন বাজারে {unitLabel}-এর তুলনামূলক দাম।
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#f6faf6] text-[#66756b]">
                <tr>
                  <th className="px-6 py-4 font-semibold">বাজার</th>
                  <th className="px-6 py-4 font-semibold">বিভাগ</th>
                  <th className="px-6 py-4 text-right font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="px-6 py-4 text-right font-semibold">
                    সর্বাধিক
                  </th>
                  <th className="px-6 py-4 text-right font-semibold">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#edf1ed]">
                {markets.map((market) => (
                  <tr
                    key={market.name}
                    className="transition hover:bg-[#f9fbf8]"
                  >
                    <td className="px-6 py-4 font-semibold text-[#17251c]">
                      {market.name}
                    </td>

                    <td className="px-6 py-4 text-[#66756b]">
                      {market.division}
                    </td>

                    <td className="px-6 py-4 text-right font-medium text-green-700">
                      {money(market.min)} টাকা
                    </td>

                    <td className="px-6 py-4 text-right font-medium text-red-600">
                      {money(market.max)} টাকা
                    </td>

                    <td className="px-6 py-4 text-right font-semibold text-[#17251c]">
                      {money(market.average)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
        </section>

        <div className="mt-8">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 rounded-xl border border-[#dce5dc] bg-white px-5 py-3 text-sm font-semibold text-[#17251c] transition hover:border-green-500 hover:text-green-700"
          >
            ← {categoryName} ক্যাটাগরিতে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
