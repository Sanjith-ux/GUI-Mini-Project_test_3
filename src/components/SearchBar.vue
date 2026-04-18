<template>
  <div class="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-soft transition duration-300 focus-within:border-brand-400 focus-within:shadow-md dark:border-slate-800 dark:bg-slate-900">
    <span class="text-slate-500 dark:text-slate-400">Search</span>
    <input
      :value="modelValue"
      @input="onInput"
      type="text"
      placeholder="Search products by title"
      class="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (event: "update:modelValue", value: string): void }>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
