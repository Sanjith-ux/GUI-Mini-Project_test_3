<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      v-for="category in categories"
      :key="category"
      @click="emit('update:modelValue', category)"
      :class="[
        'rounded-full px-4 py-2 text-sm transition duration-300',
        modelValue === category
          ? 'bg-brand-500 text-white shadow-md'
          : 'border border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600'
      ]"
    >
      {{ formatCategory(category) }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string; categories: string[] }>();
const emit = defineEmits<{ (event: "update:modelValue", value: string): void }>();

const formatCategory = (value: string) => {
  if (value === "all") return "All";
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};
</script>
