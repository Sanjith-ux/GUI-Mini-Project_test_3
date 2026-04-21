<template>
  <section class="mx-auto w-full max-w-lg animate-fadeIn space-y-6">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div class="space-y-2">
        <h1 class="font-display text-2xl text-slate-900 dark:text-white">Log in</h1>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          This is a simulation using DummyJSON. Enter any valid DummyJSON credentials.
        </p>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200" for="username">
            Username
          </label>
          <input
            id="username"
            v-model.trim="username"
            type="text"
            autocomplete="username"
            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-soft transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            placeholder="kminchelle"
            :disabled="auth.isLoading"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200" for="password">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-soft transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            placeholder="••••••••"
            :disabled="auth.isLoading"
            required
          />
        </div>

        <div
          v-if="auth.error"
          class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200"
          role="alert"
        >
          {{ auth.error }}
        </div>

        <button
          type="submit"
          class="w-full rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-500/20 transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="auth.isLoading"
        >
          {{ auth.isLoading ? "Signing in..." : "Log in" }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const username = ref("");
const password = ref("");

const onSubmit = async () => {
  try {
    await auth.login(username.value, password.value);
    const redirect =
      typeof route.query.redirect === "string" && route.query.redirect.length > 0
        ? route.query.redirect
        : "/";
    await router.replace(redirect);
  } catch {
    // store holds error
  }
};
</script>

