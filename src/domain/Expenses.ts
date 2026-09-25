type ExpenseStatus= "CONFIRMED"|"UNCONFIRMED";

export interface IExpense{
    label:string;
    amount:number;
    category:string;
    date:string;
    status:ExpenseStatus;
};