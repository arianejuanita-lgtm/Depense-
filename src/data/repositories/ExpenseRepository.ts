import type { IExpense } from "@/domain/Expenses";
import { ExpensesTab } from "../datasources/ExpensesTab";

interface IExpenseRepository {
    getExpenses(): IExpense[];
    addExpense(expense: IExpense): IExpense;
    updateExpense(expense: IExpense): IExpense;
    deleteExpense(id: number): void;
}

export class ExpenseRepository implements IExpenseRepository {
    private storageKey = 'app_expenses';

    getExpenses(): IExpense[] {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        this.saveToStorage(ExpensesTab);
        return ExpensesTab;
    }

    addExpense(expense: IExpense): IExpense {
        const expenses = this.getExpenses();
        expenses.push(expense);
        this.saveToStorage(expenses);
        return expense;
    }

    updateExpense(expense: IExpense): IExpense {
        const expenses = this.getExpenses();
        const index = expenses.findIndex(item => item.id === expense.id);
        if (index !== -1) {
            expenses[index] = expense;
            this.saveToStorage(expenses);
        }
        return expense;
    }

    deleteExpense(id: number): void {
        let expenses = this.getExpenses();
        expenses = expenses.filter((item) => item.id !== id);
        this.saveToStorage(expenses);
    }

    private saveToStorage(expenses: IExpense[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(expenses));
    }
}