<template>
  <header
    class="border-b border-slate-200/80 bg-white/85 shadow-sm shadow-slate-900/5 backdrop-blur transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-black/25"
  >
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
      <RouterLink to="/" class="group flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft transition-transform duration-300 hover:scale-105">
          <img
            src="@/logo-online-shopping-is-displayed-white-background_936990-637.jpeg"
            alt="ShopOnline.lk"
            class="h-8 w-8 rounded-xl object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p class="font-display text-lg text-slate-900 dark:text-white">ShopOnline.lk</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Curated tech & lifestyle</p>
        </div>
      </RouterLink>

      <div class="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:gap-4">
        <div
          class="hidden rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2 text-sm text-slate-700 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 lg:flex"
        >
          Free shipping over $50
        </div>
        <template v-if="auth.isAuthenticated">
          <div
            class="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 lg:flex"
            aria-label="Logged in user"
          >
            <span class="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span class="font-medium">{{ auth.user?.firstName ?? "Account" }}</span>
          </div>
          <button
            type="button"
            class="flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:flex-none"
            @click="onLogout"
            aria-label="Log out"
          >
            Log Out
          </button>
        </template>
        <RouterLink
          v-else
          :to="loginTo"
          :class="[navPillBase, isLoginActive ? navPillActive : navPillIdle]"
          aria-label="Log in"
        >
          Log In
        </RouterLink>
        <RouterLink
          :to="{ path: '/', hash: '#products' }"
          class="flex flex-1 items-center justify-center rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-500/20 transition hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 dark:shadow-brand-500/10 sm:flex-none"
          aria-label="Shop now"
        >
          Shop Now
        </RouterLink>
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
          :class="[
            navPillBase,
            isCartActive ? navPillActive : navPillIdle,
          ]"
          aria-label="Go to cart"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 6h15l-1.5 8H7.2L6 6Z" />
            <path d="M6 6 5 3H2" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span class="font-medium">Cart</span>
          <span class="rounded-full bg-brand-500 px-2 py-0.5 text-xs font-semibold text-white">
            {{ cart.totalItems }}
          </span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const cart = useCartStore();
const auth = useAuthStore();
const isDark = ref(true);
const route = useRoute();
const router = useRouter();

const isCartActive = computed(() => route.path === "/cart");
const isLoginActive = computed(() => route.path === "/login");

const onLogout = async () => {
  auth.logout();
  if (route.path === "/login") return;
  await router.push({ name: "home" });
};

const navPillBase =
  "flex flex-1 items-center justify-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800 sm:flex-none";

const navPillIdle =
  "border-slate-200 text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200";

const navPillActive =
  "border-brand-200 bg-brand-50 text-brand-700 shadow-md shadow-brand-500/10 hover:border-brand-300 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100";

const loginTo = computed(() => ({
  name: "login",
  query: { redirect: route.fullPath },
}));

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
