<!-- <script setup lang="ts">
import { ref, computed } from 'vue';
import { useGlobalFilter } from '@/presentation/common/commonFunction/UseGlobalFilter';
import { DollarSign, RotateCcw } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const globalFilterStore = useGlobalFilter();

const maxPossibleAmount = computed(() => globalFilterStore.calculatedMaxAmount);

const localMin = ref(globalFilterStore.minAmount);
const localMax = ref(globalFilterStore.maxAmount ?? maxPossibleAmount.value);

const updateFilter = () => {
  if (localMin.value > localMax.value) {
    const temp = localMin.value;
    localMin.value = localMax.value;
    localMax.value = temp;
  }
  globalFilterStore.minAmount = Number(localMin.value);
  globalFilterStore.maxAmount = Number(localMax.value);
};

const resetFilter = () => {
  localMin.value = 0;
  localMax.value = maxPossibleAmount.value;
  updateFilter();
};
</script>

<template>
  <div class="flex items-center gap-2 bg-blanc dark:bg-gray-800 border border-bleu-clair dark:border-gray-700 px-3 py-1.5 rounded-xl shadow-sm w-full sm:w-auto">
    <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 shrink-0">
      <DollarSign class="w-4 h-4 text-bleu-fon dark:text-gray-400" />
      <span class="hidden sm:inline text-xs font-semibold uppercase tracking-wider font-inter">Montant :</span>
    </div>

    <div class="flex items-center gap-2">
      <div class="relative flex items-center w-20 sm:w-24 h-6">
        <input 
          type="range" 
          v-model.number="localMin" 
          :min="0" 
          :max="maxPossibleAmount" 
          step="100"
          @input="updateFilter"
          class="absolute w-full pointer-events-none appearance-none bg-transparent accent-bleu-prin [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bleu-prin [&::-webkit-slider-thumb]:cursor-pointer z-20"
        />
        
        <!-- Input Range Max -->
        <!-- <input 
          type="range" 
          v-model.number="localMax" 
          :min="0" 
          :max="maxPossibleAmount" 
          step="100"
          @input="updateFilter"
          class="absolute w-full pointer-events-none appearance-none bg-gray-200 dark:bg-gray-700 h-1 rounded-lg accent-bleu-prin [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bleu-prin [&::-webkit-slider-thumb]:cursor-pointer z-30"
        /> -->
      <!-- </div>

      <div class="text-[11px] font-medium text-texte dark:text-gray-200 font-inter shrink-0 whitespace-nowrap">
        <span>{{ localMin }}</span> - <span>{{ localMax }}</span>
      </div>

      <Button 
        variant="ghost" 
        size="icon" 
        class="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors shrink-0" 
        title="Réinitialiser"
        @click="resetFilter"
      >
        <RotateCcw class="w-3 h-3" />
      </Button>
    </div>
  </div>
</template> --> 

<script setup></script>
<template></template>