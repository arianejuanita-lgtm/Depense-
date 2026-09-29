import { defineStore } from "pinia";
import { Expense } from "@/domain/Expenses";
import { ExpenseRepository } from "@/data/repositories/ExpenseRepository";
import { ref, computed } from "vue";

export type DatePeriod = "all" | "today" | "7days" | "30days" | "365days";

export const useExpense = defineStore("expense", () => {
  const expenseRepo = new ExpenseRepository();

  const expenses = ref<Expense[]>([]);
  const selectedPeriod = ref<DatePeriod>("all");

  async function fetchExpenses() {
    try {
      expenses.value = await expenseRepo.getExpenses();
    } catch (error) {
      console.log("erreur lors du fetch des depenses", error);
    }
  }

  async function addedExpense(expense: Expense): Promise<number> {
    try {
      const created = await expenseRepo.addExpense(expense);
      expenses.value.unshift(created);
      return created.id;
    } catch (error) {
      console.log("erreurs lors de la creation d'une depense", error);
      throw error;
    }
  }

  async function updatedExpense(expense: Expense) {
    try {
      const updated = await expenseRepo.updateExpense(expense);
      const index = expenses.value.findIndex((m) => m.id === updated.id);

      if (index !== -1) {
        expenses.value[index] = updated;
      }
    } catch (error) {
      console.log("erreur de la modification", error);
    }
  }

  async function deletedExpense(id: number) {
    try {
      await expenseRepo.deleteExpense(id);
      expenses.value = expenses.value.filter((exp) => exp.id !== id);
    } catch (error) {
      console.log("erreur dans la suppression des donnees ", error);
    }
  }

  function setPeriod(period: DatePeriod) {
    selectedPeriod.value = period;
  }

  const filteredExpensesByDate = computed(() => {
    if (selectedPeriod.value === "all") return expenses.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return expenses.value.filter((expense) => {
      const expenseDate = new Date(expense.date);
      expenseDate.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - expenseDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      switch (selectedPeriod.value) {
        case "today":
          return diffDays === 0;
        case "7days":
          return diffDays >= 0 && diffDays <= 7;
        case "30days":
          return diffDays >= 0 && diffDays <= 30;
        case "365days":
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
    setPeriod,
  };
});