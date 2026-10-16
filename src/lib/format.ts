
import type { Product } from "@/types/bazardor";

// Number-কে নিরাপদে numeric value-তে রূপান্তর করে
export function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const normalized = value
    .replace(/[০-৯]/g, (digit) =>
      String("০১২৩৪৫৬৭৮৯".indexOf(digit))
    )
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : 0;
}

// বাংলা সংখ্যায় দেখায়
export function bnNumber(value: number | string): string {
  return toNumber(value).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

// পণ্যের নাম
export function productName(product: Product): string {
  return (
    product.nameBn ||
    product.name ||
    product.title ||
    "নাম পাওয়া যায়নি"
  );
}

// পণ্যের emoji
export function productEmoji(product: Product): string {
  if (product.emoji) {
    return product.emoji;
  }

  const category =
    typeof product.category === "object"
      ? product.category?.slug || product.category?.nameBn || ""
      : product.categorySlug || product.category || "";

  const text = `${category} ${productName(product)}`.toLowerCase();

  if (text.includes("chal") || text.includes("চাল")) return "🍚";
  if (text.includes("dal") || text.includes("ডাল")) return "🫘";
  if (text.includes("tel") || text.includes("তেল")) return "🛢️";
  if (text.includes("mach") || text.includes("মাছ")) return "🐟";
  if (text.includes("mangsho") || text.includes("মাংস")) return "🍗";
  if (text.includes("dim") || text.includes("ডিম")) return "🥚";
  if (text.includes("sobji") || text.includes("সবজি")) return "🥬";
  if (text.includes("mosla") || text.includes("মসলা")) return "🌶️";

  return "🛒";
}

// পণ্যের দাম বাড়া বা কমার হার
export function productChange(product: Product): number {
  return toNumber(
    product.changePercentage ?? product.priceChange ?? 0
  );
}

// পণ্যের একক — PriceTicker.tsx-এ ব্যবহৃত হয়
export function productUnit(product: Product): string {
  return product.unit || "কেজি";
}
