<script setup lang="ts">
import AppButton from './AppButton.vue';
import { useGlobalFilter } from '../commonFunction/UseGlobalFilter';
import { CheckCircle2, Clock } from 'lucide-vue-next';

const globalFilter = useGlobalFilter();
</script>

<template>
  <AppButton
    @click="globalFilter.toggleStatusFilter()"
    :title="globalFilter.statusFilter === 'CONFIRMED' ? 'Voir les dépenses non confirmés' : 'Voir les dépenses confirmés'"
    :class="[
      'transition-all duration-200 text-xs font-semibold w-9 h-9 md:w-auto md:h-auto p-0 md:px-4 md:py-2 rounded-l flex items-center justify-center gap-2 border shadow-sm',
      globalFilter.statusFilter === 'CONFIRMED' 
        ? 'bg-bleu-prin text-blanc border-bleu-prin hover:bg-bleu-fon' 
        : 'bg-blanc text-bleu-prin border-bleu-clair hover:bg-bleu-clair/50 dark:bg-gray-900 dark:text-blue-400 dark:border-gray-700'
    ]"
  >
    <CheckCircle2 v-if="globalFilter.statusFilter === 'CONFIRMED'" class="w-4 h-4 shrink-0" />
    <Clock v-else class="w-4 h-4 shrink-0" />

    <span class="hidden md:inline">
      {{ globalFilter.statusFilter === 'CONFIRMED' ? 'Voir les non confirmés' : 'Voir les confirmés' }}
    </span>
  </AppButton>
</template>