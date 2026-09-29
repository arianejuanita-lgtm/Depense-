import { Expense } from "@/domain/Expenses";
import { ApiUrl } from "../datasources/ApiUrl";

interface IExpenseRepository {
  getExpenses(): Promise<Expense[]>;
  addExpense(expense: Expense): Promise<Expense>;
  updateExpense(expense: Expense): Promise<Expense>;
  deleteExpense(id: number): Promise<void>;
}

export class ExpenseRepository implements IExpenseRepository {
  private storageKey = "app_expenses";

  async getExpenses(): Promise<Expense[]> {
    const stored = localStorage.getItem(this.storageKey);
    let localExpenses: Expense[] = [];

    if (stored) {
      const parsed = JSON.parse(stored);
      localExpenses = parsed.map((item: any) => new Expense(item));
    }

    try {
      const response = await ApiUrl.get("");
      const items = response.data.record.epenses || [];
      
      const apiExpenses = items.map((item: any) => new Expense(item));

      this.saveToStorage(apiExpenses);
      
      return apiExpenses;
    } catch (error) {
      console.warn("Impossible de joindre l'API, utilisation du cache local :", error);
      return localExpenses;
    }
  }

  async addExpense(expense: Expense): Promise<Expense> {
    const currentExpenses = await this.getExpenses();
    currentExpenses.unshift(expense);
    this.saveToStorage(currentExpenses);

    try {
      const getResponse = await ApiUrl.get("");
      const currentData = getResponse.data.record;
      const existingExpense = currentData.epenses || [];
      const updatedExpense = [...existingExpense, expense.toJSON()];

      await ApiUrl.put("", {
        ...currentData,
        epenses: updatedExpense,
      });
    } catch (error) {
      console.error("Erreur de synchro API lors de l'ajout :", error);
    }

    return expense;
  }

  async updateExpense(expense: Expense): Promise<Expense> {
    let currentExpenses = await this.getExpenses();
    currentExpenses = currentExpenses.map((item) => 
      item.id === expense.id ? expense : item
    );
    this.saveToStorage(currentExpenses);

    try {
      const getResponse = await ApiUrl.get("");
      const currentData = getResponse.data.record;
      const existingExpense = currentData.epenses || [];

      const updatedExpenses = existingExpense.map((existExp: any) =>
        existExp.id === expense.id ? expense.toJSON() : existExp
      );

      await ApiUrl.put("", {
        ...currentData,
        epenses: updatedExpenses,
      });
    } catch (error) {
      console.error("Erreur de synchro API lors de la modification :", error);
    }

    return expense;
  }

  async deleteExpense(id: number): Promise<void> {
    let currentExpenses = await this.getExpenses();
    currentExpenses = currentExpenses.filter((item) => item.id !== id);
    this.saveToStorage(currentExpenses);

    try {
      const getResponse = await ApiUrl.get("");
      const currentData = getResponse.data.record;
      const existingExpense = currentData.epenses || [];

      const updatedExp = existingExpense.filter((exp: any) => exp.id !== id);

      await ApiUrl.put("", {
        ...currentData,
        epenses: updatedExp,
      });
    } catch (error) {
      console.error("Erreur de synchro API lors de la suppression :", error);
    }
  }

  private saveToStorage(expenses: Expense[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(expenses));
  }
}