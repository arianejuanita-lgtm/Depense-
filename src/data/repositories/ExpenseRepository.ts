import type { IExpense } from "@/domain/Expenses";
import { ExpensesTab } from "../datasources/ExpensesTab";

interface IExpenseRepository{
    getExpenses():IExpense[];
    // addExpenses(expense:IExpense):IExpense;
    // udapteExpenses(expense:IExpense):IExpense;
    deleteExpenses(id:number):void;
}

export class ExpenseRepository implements IExpenseRepository{

    getExpenses(){
        return ExpensesTab;
    }

    // addExpenses(expense: IExpense): IExpense {
    //     const response= ExpensesTab.push(expense);
    //     return response;
    // }

    // udapteExpenses(expense: IExpense): IExpense {
        
    // }

    deleteExpenses(id: number): void {
    ExpensesTab.filter((item)=> item.id !== id);
   }

    
}