<script setup lang="ts">
import { useExpense } from "../../expense/store/UseExpense";
import { useCategory } from "../store/UseCategory";
import CategoryItem from "@/presentation/common/commonView/CategoryItem.vue";
import { computed } from "vue";
import { useGlobalFilter } from "@/presentation/common/commonFunction/UseGlobalFilter";

const expenseStore = useExpense();
const categoryStore = useCategory();
const globalFilterStore = useGlobalFilter();

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
</script>

<template>
  <div class="flex gap-2 py-2 overflow-x-auto">
    <CategoryItem 
      v-for="cat in categoriesWithTotals" 
      :key="cat.id"
      v-model="globalFilterStore.category"
      :value="cat.id"
      :category="cat" 
      :amount="cat.totalAmount" 
    />
  </div>
</template>