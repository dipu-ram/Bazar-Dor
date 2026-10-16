
import type { Category, Product } from "@/types/bazardor";

const API_BASE_URLS = [
  process.env.BAZARDOR_API_URL,
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter(
  (url, index, all): url is string =>
    Boolean(url) && all.indexOf(url) === index
);

async function requestApi(path: string): Promise<unknown> {
  let lastError: Error = new Error("API unavailable");

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        lastError = new Error(`API request failed: ${response.status}`);

        if (response.status === 429 || response.status >= 500) {
          continue;
        }

        throw lastError;
      }

      return await response.json();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.startsWith("API request failed: ") &&
        !["429", "500", "502", "503", "504"].some((status) =>
          error.message.endsWith(status)
        )
      ) {
        throw error;
      }

      lastError =
        error instanceof Error ? error : new Error("API unavailable");
    }
  }

  throw lastError;
}

function extractList<T>(response: unknown, keys: string[]): T[] {
  let value = response;

  for (let i = 0; i < 6; i++) {
    if (Array.isArray(value)) return value as T[];
    if (!value || typeof value !== "object") return [];

    const record = value as Record<string, unknown>;
    const key = keys.find((item) => item in record);

    if (key) {
      value = record[key];
    } else if ("data" in record) {
      value = record.data;
    } else {
      return [];
    }
  }

  return Array.isArray(value) ? (value as T[]) : [];
}

function extractItem<T>(response: unknown): T | null {
  let value = response;

  for (let i = 0; i < 6; i++) {
    if (!value || typeof value !== "object") return null;

    const record = value as Record<string, unknown>;

    if ("product" in record) {
      value = record.product;
      continue;
    }

    if ("data" in record) {
      value = record.data;
      continue;
    }

    if ("id" in record || "slug" in record) {
      return value as T;
    }

    return null;
  }

  return null;
}

export async function getProducts(): Promise<Product[]> {
  try {
    return extractList<Product>(await requestApi("/products"), [
      "products",
      "items",
    ]);
  } catch (error) {
    console.error("Could not load products:", error);
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    return extractItem<Product>(
      await requestApi(`/products/${encodeURIComponent(slug)}`)
    );
  } catch (error) {
    console.error("Could not load product:", error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return extractList<Category>(await requestApi("/categories"), [
      "categories",
      "items",
    ]);
  } catch (error) {
    console.error("Could not load categories:", error);
    return [];
  }
}

export async function getCategoryProducts(
  slug: string
): Promise<Product[]> {
  try {
    return extractList<Product>(
      await requestApi(
        `/products?category=${encodeURIComponent(slug)}`
      ),
      ["products", "items"]
    );
  } catch (error) {
    console.error("Could not load category products:", error);
    return [];
  }
}
