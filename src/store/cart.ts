import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

const STORAGE_KEY = "nova-cart";

const loadFromStorage = (): CartItem[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: CartItem[] = JSON.parse(raw);
    return parsed;
  } catch {
    return [];
  }
};

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>(loadFromStorage());

  watch(
    items,
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    },
    { deep: true }
  );

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
  );

  const addItem = (product: Product) => {
    const existing = items.value.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
      return;
    }
    items.value.push({ product, quantity: 1 });
  };

  const removeItem = (productId: number) => {
    items.value = items.value.filter((item) => item.product.id !== productId);
  };

  const decreaseItem = (productId: number) => {
    const existing = items.value.find((item) => item.product.id === productId);
    if (!existing) return;
    existing.quantity -= 1;
    if (existing.quantity <= 0) {
      removeItem(productId);
    }
  };

  const clear = () => {
    items.value = [];
  };

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    decreaseItem,
    clear,
  };
});
