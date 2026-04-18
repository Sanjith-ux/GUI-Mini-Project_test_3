<template>
  <header class="border-b border-slate-200/60 bg-white/70 backdrop-blur transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/70">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft transition-transform duration-300 hover:scale-105">
          <span class="font-display text-lg">N</span>
        </div>
        <div>
          <p class="font-display text-lg text-slate-900 dark:text-white">NovaMart</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Curated tech & lifestyle</p>
        </div>
      </RouterLink>

      <div class="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:gap-4">
        <div class="hidden rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-colors duration-300 dark:border-slate-700 dark:text-slate-300 lg:flex">
          Free shipping over $50
        </div>
        <button
          class="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:flex-none"
          type="button"
          @click="toggleDarkMode"
          aria-label="Toggle theme"
        >
          <span class="text-lg leading-none" aria-hidden="true">{{ isDark ? "☾" : "☀️" }}</span>
        </button>
        <RouterLink
          to="/cart"
          class="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 sm:flex-none"
          aria-label="Go to cart"
        >
          <span>Cart</span>
          <span class="rounded-full bg-brand-500 px-2 py-0.5 text-xs font-semibold text-white">
            {{ cart.totalItems }}
          </span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCartStore } from "@/store/cart";

const cart = useCartStore();
const isDark = ref(true);

const applyTheme = (value: boolean) => {
  const root = document.documentElement;
  if (value) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("nova-theme", isDark.value ? "dark" : "light");
  applyTheme(isDark.value);
};

onMounted(() => {
  const saved = localStorage.getItem("nova-theme");
  isDark.value = saved ? saved === "dark" : true;
  applyTheme(isDark.value);
});
</script>
