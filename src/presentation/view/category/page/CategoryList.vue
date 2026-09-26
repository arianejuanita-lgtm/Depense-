<script setup lang="ts">
import { ref, computed } from "vue";
import { useExpense } from "../../expense/store/UseExpense";
import { useCategory } from "../store/UseCategory";
import CategoryItem from "@/presentation/common/commonView/CategoryItem.vue";
import { useGlobalFilter } from "@/presentation/common/commonFunction/UseGlobalFilter";
import { SlidersHorizontal, X } from 'lucide-vue-next';

const expenseStore = useExpense();
const categoryStore = useCategory();
const globalFilterStore = useGlobalFilter();

const showMobileMenu = ref(false);

const categoriesWithTotals = computed(() => {
    return categoryStore.categories.map(category => {
        const total = expenseStore.expenses
            .filter(expense => expense.categoryId === category.id)
            .reduce((sum, expense) => sum + expense.amount, 0);

        return {
            ...category,
            totalAmount: total
        };
    });
});

const toggleCategory = (id: number) => {
    const currentCategories = [...globalFilterStore.category];
    const index = currentCategories.indexOf(id);

    if (index > -1) {
        currentCategories.splice(index, 1);
    } else {
        currentCategories.push(id); 
    }
    
    globalFilterStore.category = currentCategories;
};
</script>

<template>
  <div class="relative">
    <div class="flex md:hidden items-center">
      <button 
        @click="showMobileMenu = !showMobileMenu"
        class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 active:scale-95 transition"
      >
        <SlidersHorizontal class="w-5 h-5 text-gray-600" />
        <span class="text-sm font-medium">Catégories</span>
        <span v-if="globalFilterStore.category.length > 0" class="ml-1 px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">
          {{ globalFilterStore.category.length }}
        </span>
      </button>

      <div 
        v-if="showMobileMenu" 
        @click="showMobileMenu = false" 
        class="fixed inset-0 z-40"
      ></div>

      <div 
        v-if="showMobileMenu" 
        class="absolute top-12 left-0 z-50 w-72 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl p-2.5 flex flex-col gap-1.5 animate-fadeIn"
      >
        <div class="flex justify-between items-center px-2 pb-1 border-b border-gray-100">
          <span class="text-xs font-semibold text-gray-500 uppercase">Filtrer par catégorie</span>
          <button @click="showMobileMenu = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-4 h-4" />
          </button>
        </div>

        <div 
          v-for="cat in categoriesWithTotals" 
          :key="cat.id"
          @click="toggleCategory(cat.id)"
          class="cursor-pointer transition rounded-lg p-1.5 hover:bg-gray-50 w-full"
          :class="{ 'bg-blue-50 border border-blue-100': globalFilterStore.category.includes(cat.id) }"
        >
          <CategoryItem 
            v-model="globalFilterStore.category"
            :value="cat.id"
            :category="cat" 
            :amount="cat.totalAmount" 
            class="w-full [&>div]:w-full pointer-events-none" 
          />
        </div>
      </div>
    </div>

    <div class="hidden md:flex gap-2 py-2 overflow-x-auto">
      <CategoryItem 
        v-for="cat in categoriesWithTotals" 
        :key="cat.id"
        v-model="globalFilterStore.category"
        :value="cat.id"
        :category="cat" 
        :amount="cat.totalAmount" 
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