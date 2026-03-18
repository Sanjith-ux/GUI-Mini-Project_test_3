import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Product, ProductsResponse } from "@/types/product";

const API_URL = "https://dummyjson.com/products?limit=100";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const categories = computed(() => {
    const unique = new Set(products.value.map((product) => product.category));
    return ["all", ...Array.from(unique).sort()];
  });

  const fetchProducts = async () => {
    if (products.value.length > 0) return;
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }
      const data: ProductsResponse = await response.json();
      products.value = data.products;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
    } finally {
      isLoading.value = false;
    }
  };

  const getById = (id: number) => {
    return products.value.find((product) => product.id === id) ?? null;
  };

  return {
    products,
    categories,
    isLoading,
    error,
    fetchProducts,
    getById,
  };
});
