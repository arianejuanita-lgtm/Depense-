import { useExpense } from "@/presentation/view/expense/store/UseExpense";
import { defineStore } from "pinia";
import { ref, computed } from "vue";


export const useGlobalFilter = defineStore('globalFilter', () => {
    const expenseStore = useExpense();

    const category = ref<number[]>([]);
    
    const minAmount = ref<number | null>(null);
    const maxAmount = ref<number | null>(null);

    const label = ref<string>('');
    const date = ref<string[]>([]);

   const finalExpense = computed(() => {
    let results = expenseStore.expenses;

    if (category.value.length > 0) {
        results = results.filter(exp => category.value.includes(exp.categoryId));
    }

    if (minAmount.value !== null && minAmount.value !== undefined) {
        results = results.filter(exp => exp.amount >= minAmount.value!);
    }

    if (maxAmount.value !== null && maxAmount.value !== undefined) {
        results = results.filter(exp => exp.amount <= maxAmount.value!);
    }

    if (label.value.trim() !== '') {
        const searchLower = label.value.toLowerCase().trim();
        results = results.filter(exp => exp.label.toLowerCase().includes(searchLower));
    }

    if (date.value.length > 0) {
        results = results.filter(exp => date.value.includes(exp.date));
    }

    return results;
});

    return {
        category,
        minAmount,
        maxAmount,
        label,
        date,
        finalExpense
    };
});