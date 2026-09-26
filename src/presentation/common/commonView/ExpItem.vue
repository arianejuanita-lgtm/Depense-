<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import type { IExpense } from '@/domain/Expenses';
import { Card } from '@/components/ui/card';
import AppButton from '@/presentation/common/commonView/AppButton.vue'; 

defineProps<{
    item: IExpense;
}>();

defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
  <Card 
    @click="$emit('click')"
    class="bg-blanc dark:bg-gray-800 border-bleu-clair h-1.5 relative flex items-center justify-center dark:border-gray-700 shadow-sm rounded-xl overflow-visible transition-all hover:shadow-md hover:border-bleu-prin group cursor-pointer"
  >
    <div class="absolute inset-0 px-3 flex items-center justify-between">
      
      <div class="flex items-center gap-2 truncate">
        <div class="w-6 h-6 rounded-md bg-bleu-clair/40 dark:bg-gray-700 text-bleu-prin dark:text-blue-400 flex items-center justify-center font-poppins font-bold text-[10px] shrink-0 transition-colors group-hover:bg-bleu-prin group-hover:text-blanc">
          <span>{{ item.label ? item.label.charAt(0).toUpperCase() : 'C' }}</span>
        </div>

        <div class="flex flex-col truncate leading-none gap-0.5">
          <h3 class="font-inter text-[10px] font-bold text-texte dark:text-gray-200 truncate">
            {{ item.label }}
          </h3>
          <span class="font-poppins text-[10px] font-semibold text-bleu-fon dark:text-gray-400 truncate">
            {{ Number(item.amount).toFixed(0) }} Fcfa
          </span>
        </div>
      </div>
      
      <AppButton 
        variant="ghost" 
        size="icon" 
        custom-class="w-5 h-5 rounded-full bg-bleu-clair/20 dark:bg-gray-700 text-bleu-prin dark:text-gray-300 group-hover:bg-bleu-prin group-hover:text-blanc shrink-0"
      >
        <ArrowRight class="w-3 h-3" />
        <span class="sr-only">Voir les détails</span>
      </AppButton>

    </div>
  </Card>
</template>