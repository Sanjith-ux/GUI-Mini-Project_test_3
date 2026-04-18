<template>
  <section class="space-y-6 animate-fadeIn">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-3xl text-slate-900 dark:text-white">Your cart</h1>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Review your items before checkout.
        </p>
      </div>
      <RouterLink
        to="/"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
      >
        Continue shopping
      </RouterLink>
    </div>

    <div
      v-if="cart.items.length === 0"
      class="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
    >
      Cart is empty.
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-[1.4fr,0.6fr] lg:items-start">
      <div class="space-y-4">
        <article
          v-for="item in cart.items"
          :key="item.product.id"
          class="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-4">
            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="h-20 w-24 rounded-2xl object-cover"
              loading="lazy"
            />
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.product.category }}</p>
              <p class="mt-0.5 font-display text-lg text-slate-900 dark:text-white">
                {{ item.product.title }}
              </p>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                ${{ item.product.price.toFixed(2) }}
                <span class="text-slate-400 dark:text-slate-500">each</span>
              </p>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
            <div class="flex items-center gap-2">
              <button
                class="h-10 w-10 rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
                type="button"
                :aria-label="`Decrease quantity for ${item.product.title}`"
                @click="cart.decreaseItem(item.product.id)"
              >
                -
              </button>
              <span class="min-w-8 text-center text-sm font-semibold text-slate-900 dark:text-white">
                {{ item.quantity }}
              </span>
              <button
                class="h-10 w-10 rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
                type="button"
                :aria-label="`Increase quantity for ${item.product.title}`"
                @click="cart.addItem(item.product)"
              >
                +
              </button>
            </div>

            <div class="text-sm text-slate-600 dark:text-slate-300">
              Item total:
              <span class="font-semibold text-slate-900 dark:text-white">
                ${{ (item.quantity * item.product.price).toFixed(2) }}
              </span>
            </div>

            <button
              class="rounded-full border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-700 transition hover:bg-rose-500/15 dark:text-rose-200"
              type="button"
              :aria-label="`Remove ${item.product.title} from cart`"
              @click="cart.removeItem(item.product.id)"
            >
              Remove
            </button>
          </div>
        </article>
      </div>

      <aside class="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-center justify-between">
          <span class="text-sm text-slate-600 dark:text-slate-300">Items</span>
          <span class="text-sm font-semibold text-slate-900 dark:text-white">{{ cart.totalItems }}</span>
        </div>
        <div class="flex items-center justify-between border-t border-slate-200/70 pt-4 dark:border-slate-800">
          <span class="text-sm text-slate-600 dark:text-slate-300">Total</span>
          <span class="text-lg font-semibold text-slate-900 dark:text-white">
            ${{ cart.totalPrice.toFixed(2) }}
          </span>
        </div>

        <button
          class="w-full rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-brand-400 active:scale-[0.99]"
          type="button"
          disabled
          title="Checkout not implemented"
        >
          Checkout
        </button>

        <button
          class="w-full rounded-full border border-slate-200 px-5 py-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
          type="button"
          @click="cart.clear()"
        >
          Clear cart
        </button>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart";

const cart = useCartStore();
</script>

