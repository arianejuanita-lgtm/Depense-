<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  label: string;
  value: string | number;
  valueClass?: string;
}>();
</script>

<template>
  <div class="flex items-center justify-between p-3.5 rounded-xl bg-bleu-clair/10 dark:bg-gray-800/50 border border-bleu-clair/30 dark:border-gray-700">
    <div class="flex items-center gap-2.5 text-bleu-fon dark:text-gray-300 text-sm font-medium">
      <component :is="icon" class="w-4 h-4 text-bleu-prin" />
      <span>{{ label }}</span>
    </div>
    <span :class="['text-sm font-medium text-texte dark:text-gray-100', valueClass]">
      {{ value }}
    </span>
  </div>
</template>