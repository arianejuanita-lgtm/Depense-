import { useExpense } from "@/presentation/view/expense/store/UseExpense";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useGlobalFilter = defineStore('globalFilter', () => {
    const expenseStore = useExpense();

    const category = ref<number[]>([]);
    
    const minAmount = ref<number>(0);
    
    const maxAmount = ref<number>(
        expenseStore.expenses.length > 0 
            ? Math.max(...expenseStore.expenses.map(exp => exp.amount)) + 1 
            : 0
    );

    const label = ref<string>('');
    const date = ref<string[]>([]);

    const calculatedMaxAmount = computed(() => {
        if (expenseStore.expenses.length === 0) return 0;
        return Math.max(...expenseStore.expenses.map(exp => exp.amount)) + 1;
    });

    const finalExpense = computed(() => {
        let results = expenseStore.expenses;

        if (category.value.length > 0) {
            results = results.filter(exp => category.value.includes(exp.categoryId));
        }

        results = results.filter(exp => exp.amount >= minAmount.value);

        if (maxAmount.value !== null && maxAmount.value !== undefined) {
            results = results.filter(exp => exp.amount <= maxAmount.value);
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
        calculatedMaxAmount, 
        label,
        date,
        finalExpense
    };
});