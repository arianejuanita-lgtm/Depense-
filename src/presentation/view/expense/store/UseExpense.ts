import { defineStore } from "pinia";
import type { IExpense } from "@/domain/Expenses";
import { ExpenseRepository } from "@/data/repositories/ExpenseRepository";
import { ref } from "vue";

export const useExpense = defineStore('expense', () => {
    const expenseRepo = new ExpenseRepository();
    
    const expenses = ref<IExpense[]>(expenseRepo.getExpenses());

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

    return {
        expenses,
        fetchExpenses,
        addedExpense,
        updatedExpense,
        deletedExpense
    };
});