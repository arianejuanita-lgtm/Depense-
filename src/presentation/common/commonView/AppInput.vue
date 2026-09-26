<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { Input } from '@/components/ui/input';
import type { Component } from 'vue';

interface Props {
    name: string; 
    type?: string;
    placeholder?: string;
    label?: string;
    icon?: Component; 
    customClass?: string;
}

withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    label: '',
    customClass: '',
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" class="font-inter text-xs font-semibold text-texte dark:text-gray-300">
      {{ label }}
    </label>
    
    <div class="relative flex items-center">
      <component 
        :is="icon" 
        v-if="icon" 
        class="absolute left-3 w-4 h-4 text-bleu-fon dark:text-gray-400 shrink-0 pointer-events-none z-10" 
      />

      <Field :name="name" v-slot="{ field, meta }">
        <Input 
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          class="bg-blanc dark:bg-gray-800 border-bleu-clair dark:border-gray-700 text-texte dark:text-gray-100 focus-visible:ring-2 focus-visible:ring-bleu-prin rounded-xl h-10 text-sm font-inter"
          :class="[
            icon ? 'pl-9' : 'px-3', 
            meta.touched && !meta.valid ? 'border-red-500 focus-visible:ring-red-500' : '', 
            customClass
          ]"
        />
      </Field>
    </div>

    <ErrorMessage :name="name" class="text-[10px] text-red-500 font-inter" />
  </div>
</template>