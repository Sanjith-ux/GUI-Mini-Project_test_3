<template>
  <section class="space-y-6 animate-fadeIn">
    <RouterLink to="/" class="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">← Back to products</RouterLink>

    <div v-if="productsStore.isLoading" class="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      Loading product...
    </div>

    <div v-else-if="!product" class="rounded-3xl border border-rose-500/50 bg-rose-500/10 p-10 text-center text-rose-600 dark:text-rose-200">
      Product not found.
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
      <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
        <img :src="product.thumbnail" :alt="product.title" class="h-full w-full object-cover" />
      </div>
      <div class="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p class="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-200">{{ product.category }}</p>
          <h1 class="mt-2 font-display text-3xl text-slate-900 dark:text-white">{{ product.title }}</h1>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">{{ product.description }}</p>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-semibold text-slate-900 dark:text-white">${{ product.price }}</span>
          <div class="flex items-center gap-2">
            <button
              class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
              @click="cart.decreaseItem(product.id)"
            >
              -
            </button>
            <button
              class="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-brand-400 active:scale-95"
              @click="cart.addItem(product)"
            >
              Add to cart
            </button>
            <button
              class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
              @click="cart.removeItem(product.id)"
            >
              Remove
            </button>
          </div>
        </div>
        <div class="rounded-2xl bg-slate-100/80 p-4 text-sm text-slate-600 transition-colors duration-300 dark:bg-slate-950/60 dark:text-slate-400">
          Cart total: <span class="text-slate-900 dark:text-white">${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProductsStore } from "@/store/products";
import { useCartStore } from "@/store/cart";

const props = defineProps<{ id: number }>();

const productsStore = useProductsStore();
const cart = useCartStore();

onMounted(() => {
  productsStore.fetchProducts();
});

const product = computed(() => productsStore.getById(props.id));
</script>
