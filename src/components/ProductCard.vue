<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
    <RouterLink :to="`/product/${product.id}`" class="block">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span class="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-200">
          {{ product.category }}
        </span>
      </div>
    </RouterLink>
    <div class="flex flex-1 flex-col gap-4 p-5">
      <div>
        <h3 class="text-base font-semibold text-slate-900 transition-colors duration-300 group-hover:text-brand-600 dark:text-white">
          {{ product.title }}
        </h3>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {{ product.description }}
        </p>
      </div>
      <div class="mt-auto flex items-center justify-between">
        <span class="text-lg font-semibold text-slate-900 dark:text-white">${{ product.price }}</span>
        <button
          class="rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white transition hover:scale-105 hover:bg-brand-400 active:scale-95"
          @click="addToCart"
        >
          Add to cart
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";

const props = defineProps<{ product: Product }>();
const cart = useCartStore();

const addToCart = () => {
  cart.addItem(props.product);
};
</script>
