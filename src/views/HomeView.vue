<template>
  <section class="space-y-8 animate-fadeIn">
    <div class="rounded-3xl bg-gradient-to-r from-white via-slate-50 to-brand-100/70 p-8 shadow-soft transition-colors duration-300 dark:from-slate-900 dark:via-slate-900 dark:to-brand-900/60">
      <p class="text-sm uppercase tracking-widest text-brand-600 dark:text-brand-200">New arrivals</p>
      <h1 class="mt-3 font-display text-3xl text-slate-900 dark:text-white sm:text-4xl">
        Discover the smartest picks for your everyday life
      </h1>
      <p class="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        Browse curated products powered by the DummyJSON catalog. Filter by category, search for your favorites, and build your cart.
      </p>
    </div>

    <div class="grid gap-4 lg:grid-cols-[2fr,3fr]">
      <SearchBar v-model="search" />
      <FilterBar v-model="selectedCategory" :categories="productsStore.categories" />
    </div>

    <div v-if="!productsStore.isLoading && filteredProducts.length === 0" class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <p class="text-lg font-semibold text-slate-900 dark:text-white">No products found</p>
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filter selection.</p>
    </div>

    <ProductList
      v-else
      :products="filteredProducts"
      :is-loading="productsStore.isLoading"
      :error="productsStore.error"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "@/store/products";
import SearchBar from "@/components/SearchBar.vue";
import FilterBar from "@/components/FilterBar.vue";
import ProductList from "@/components/ProductList.vue";

const productsStore = useProductsStore();
const search = ref("");
const selectedCategory = ref("all");

onMounted(() => {
  productsStore.fetchProducts();
});

const filteredProducts = computed(() => {
  const query = search.value.trim().toLowerCase();
  return productsStore.products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory.value === "all" || product.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>
