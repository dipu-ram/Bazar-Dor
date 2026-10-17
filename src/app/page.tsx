
import type { Product } from "@/types/bazardor";

import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import RisingPrices from "@/components/RisingPrices";
import FallingPrices from "@/components/FallingPrices";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";

export const revalidate = 60;

export default async function HomePage() {
  let products: Product[] = [];

  try {
    const result = await getProducts();
    products = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Products API Error:", error);
  }

  return (
    <main className="min-h-screen">
      <PriceTicker products={products} />

      <Hero />

      <RisingPrices />

      <FallingPrices />

      <section
        id="সব-পণ্য"
        className="container-main section-space scroll-mt-32"
      >
        <ProductGrid
          products={products}
          title="🛒 সব পণ্য"
          subtitle="নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজারদর দেখুন"
        />

        {products.length === 0 && (
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <h2 className="font-semibold text-gray-800">
              পণ্যের তথ্য পাওয়া যাচ্ছে না।
            </h2>

            
            
          </div>
        )}
      </section>
    </main>
  );
}
