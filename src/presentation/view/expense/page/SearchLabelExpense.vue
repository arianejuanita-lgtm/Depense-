<script setup lang="ts">
import { ref } from "vue";
import { useGlobalFilter } from "@/presentation/common/commonFunction/UseGlobalFilter";
import { Search, X } from '@lucide/vue';
import ButtonSearch from "@/presentation/common/commonView/ButtonSearch.vue";          
import InputGroupSearch from "@/presentation/common/commonView/InputGroupSearch.vue";

const globalFilterStore = useGlobalFilter();
const showMobileSearch = ref(false);

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value;
  if (!showMobileSearch.value) {
    globalFilterStore.label = '';
  }
};
</script>

<template>
  <div class="flex items-center">
    
    <div class="flex md:hidden items-center">
      <ButtonSearch 
        variant="outline" 
        size="icon" 
        @click="toggleMobileSearch"
        customClass="h-9 w-9"
        title="Rechercher"
      >
        <Search class="w-4 h-4 text-gray-600" />
      </ButtonSearch>

      <div 
        v-if="showMobileSearch" 
        class="absolute inset-0 z-50 w-full h-full bg-white dark:bg-gray-900 flex items-center justify-between gap-2 animate-fadeIn"
      >
        <InputGroupSearch 
          v-model="globalFilterStore.label"
          placeholder="Rechercher par label..."
          autofocus
          class="w-full flex-1"
        />

        <ButtonSearch 
          variant="ghost" 
          size="icon" 
          @click="toggleMobileSearch" 
          customClass="h-9 w-9 shrink-0 text-gray-400 hover:text-gray-600"
        >
          <X class="w-5 h-5" />
        </ButtonSearch>
      </div>
    </div>

    <div class="hidden md:flex items-center w-64 lg:w-80">
      <InputGroupSearch 
        v-model="globalFilterStore.label"
        placeholder="Rechercher par label..."
      />
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.15s ease-out forwards;
}
</style>