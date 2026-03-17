<template>
  <div>
    <div v-if="isLoading" class="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      Loading products...
    </div>
    <div v-else-if="error" class="rounded-3xl border border-rose-500/50 bg-rose-500/10 p-10 text-center text-rose-600 dark:text-rose-200">
      {{ error }}
    </div>
    <div
      v-else
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard.vue";

defineProps<{ products: Product[]; isLoading: boolean; error: string | null }>();
</script>
