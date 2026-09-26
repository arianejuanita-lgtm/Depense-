<script setup lang="ts">
import { computed } from 'vue';
import { CalendarDays } from 'lucide-vue-next';
import {  
  NativeSelect,  
  NativeSelectOption,
} from '@/components/ui/native-select';

import { useGlobalFilter } from '@/presentation/common/commonFunction/UseGlobalFilter';
const globalFilterStore = useGlobalFilter();

export type DatePeriod = 'all' | 'today' | '7days' | '30days' | '365days';
interface DateOption {
    label: string; 
    value: DatePeriod;
}

const periods: DateOption[] = [
    { label: 'Tous', value: 'all' },
    { label: "Aujourd'hui", value: 'today' },
    { label: '7 derniers jours', value: '7days' },
    { label: '30 jours', value: '30days' },
    { label: '365 jours', value: '365days' },
];

const currentPeriod = computed({
    get: () => globalFilterStore.selectedPeriod,
    set: (value) => globalFilterStore.setPeriod(value as DatePeriod)
});
</script>

<template>
  <div class="flex items-center gap-2.5 py-2 w-full sm:w-auto">
    <!-- Icône toujours visible, texte "Période :" masqué sur mobile et affiché à partir de la taille sm -->
    <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 shrink-0">
      <CalendarDays class="w-4 h-4 text-bleu-fon dark:text-gray-400 shrink-0" />
      <span class="hidden sm:inline text-xs font-semibold uppercase tracking-wider font-inter">Période :</span>
    </div>

    <!-- Sélecteur natif -->
    <NativeSelect 
      v-model="currentPeriod"
      class="w-full sm:w-auto h-9 px-3 rounded-xl text-xs font-medium font-inter bg-blanc dark:bg-gray-800 border border-bleu-clair dark:border-gray-700 text-texte dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-bleu-prin transition-all cursor-pointer"
    >
      <NativeSelectOption 
        v-for="period in periods" 
        :key="period.value" 
        :value="period.value"
        class="bg-blanc dark:bg-gray-800 text-texte dark:text-gray-100 py-1"
      >
        {{ period.label }}
      </NativeSelectOption>
    </NativeSelect>
  </div>
</template>