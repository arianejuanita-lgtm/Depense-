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
  <div class="relative flex items-center">
    
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
        class="absolute top-12 left-0 z-50 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-2 flex items-center gap-2 animate-fadeIn"
      >
        <InputGroupSearch 
          v-model="globalFilterStore.label"
          placeholder="Rechercher par label..."
          autofocus
        />

        <ButtonSearch 
          variant="ghost" 
          size="icon" 
          @click="toggleMobileSearch" 
          customClass="h-8 w-8 text-gray-400 hover:text-gray-600"
        >
          <X class="w-4 h-4" />
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
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.15s ease-out forwards;
}
</style>