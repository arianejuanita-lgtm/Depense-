import { useExpense, type DatePeriod } from "@/presentation/view/expense/store/UseExpense";
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
    
    const selectedPeriod = ref<DatePeriod>('all');

    function setPeriod(period: DatePeriod) {
        selectedPeriod.value = period;
    }

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

        if (selectedPeriod.value !== 'all') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            results = results.filter(exp => {
                const expenseDate = new Date(exp.date);
                expenseDate.setHours(0, 0, 0, 0);

                const diffTime = today.getTime() - expenseDate.getTime();
                const diffDays = diffTime / (1000 * 3600 * 24);

                switch (selectedPeriod.value) {
                    case 'today':
                        return diffDays === 0;
                    case '7days':
                        return diffDays >= 0 && diffDays <= 7;
                    case '30days':
                        return diffDays >= 0 && diffDays <= 30;
                    case '365days':
                        return diffDays >= 0 && diffDays <= 365;
                    default:
                        return true;
                }
            });
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
        selectedPeriod,
        setPeriod,
        expenses: finalExpense
    };
});