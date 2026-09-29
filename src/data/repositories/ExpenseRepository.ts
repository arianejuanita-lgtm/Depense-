import { Expense } from "@/domain/Expenses";
import { ApiUrl } from "../datasources/ApiUrl";

interface IExpenseRepository {
    getExpenses():Promise<Expense[]>;
    addExpense(expense:Expense):Promise<Expense>; 
    updateExpense(expense: Expense):Promise<Expense>;
    deleteExpense(id: number): void;
}

export class ExpenseRepository implements IExpenseRepository {
    private storageKey = 'app_expenses';
 async getExpenses(): Promise<Expense[]> {
     const response = await ApiUrl.get("");
     const items= response.data.record.epenses;

     return items.map((item : Expense)=>
    new Expense({
    id:item.id,
    label:item.label,
    amount:item.amount,
    categoryId:item.categoryId,
    date:item.date,
    status:item.status
    })
    );
 }


    // getExpenses(): IExpense[] {
    //     const stored = localStorage.getItem(this.storageKey);
    //     if (stored) {
    //         return JSON.parse(stored);
    //     }
    //     this.saveToStorage(ExpensesTab);
    //     return ExpensesTab;
    // }


    async addExpense(expense: Expense): Promise<Expense> {
        const getResponse = await  
    }

//       async createMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    
//     const getResponse = await apiClient.get("");
//     const currentData = getResponse.data.record;
//     const existingItems = currentData.menu_items || [];
    
//     const updatedItems = [...existingItems, menuItem.toJSON()];
    
//     await apiClient.put("", {
//       ...currentData,
//       menu_items: updatedItems
//     });
//     return menuItem;
//   }


    // addExpense(expense: Omit<IExpense, 'id'>): IExpense {
    //     const expenses = this.getExpenses();
        
    //     const newExpense: IExpense = {
    //         ...expense,
    //         id: Date.now(), 
    //     };

    //     expenses.unshift(newExpense);
    //     this.saveToStorage(expenses);
    //     return newExpense;
    // }

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

    private saveToStorage(expenses: Expense[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(expenses));
    }
}