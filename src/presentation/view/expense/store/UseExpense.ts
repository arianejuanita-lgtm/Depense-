import { defineStore } from "pinia";
import type { IExpense } from "@/domain/Expenses";
import { ExpenseRepository } from "@/data/repositories/ExpenseRepository";
import { ref, computed } from "vue";

export type DatePeriod = 'all' | 'today' | '7days' | '30days' | '365days';

export const useExpense = defineStore('expense', () => {
    const expenseRepo = new ExpenseRepository();
    
    const expenses = ref<IExpense[]>(expenseRepo.getExpenses());
    const selectedPeriod = ref<DatePeriod>('all');

    function fetchExpenses() {
        expenses.value = expenseRepo.getExpenses();
    }

    function addedExpense(expense: IExpense) {
        expenseRepo.addExpense(expense);
        expenses.value = expenseRepo.getExpenses();
    }

    function updatedExpense(expense: IExpense) {
        expenseRepo.updateExpense(expense);
        expenses.value = expenseRepo.getExpenses();
    }

    function deletedExpense(id: number) {
        expenseRepo.deleteExpense(id);
        expenses.value = expenseRepo.getExpenses();
    }

    function setPeriod(period: DatePeriod) {
        selectedPeriod.value = period;
    }

    const filteredExpensesByDate = computed(() => {
        if (selectedPeriod.value === 'all') return expenses.value;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return expenses.value.filter(expense => {
            const expenseDate = new Date(expense.date);
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
    });

    return {
        expenses,
        selectedPeriod,
        filteredExpensesByDate,
        fetchExpenses,
        addedExpense,
        updatedExpense,
        deletedExpense,
        setPeriod
    };
});