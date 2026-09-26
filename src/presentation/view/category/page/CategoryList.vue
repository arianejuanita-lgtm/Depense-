<script setup lang="ts">
import { useExpense } from "../../expense/store/UseExpense";
import { useCategory } from "../store/UseCategory";
import CategoryItem from "@/presentation/common/commonView/CategoryItem.vue";
import { computed } from "vue";

const expenseStore = useExpense();
const categoryStore = useCategory();

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
  <div class="flex gap-2 py-2">
    <div v-for="cat in categoriesWithTotals" :key="cat.id">
      <CategoryItem :category="cat" :amount="cat.totalAmount" />
    </div>
  </div>
</template>