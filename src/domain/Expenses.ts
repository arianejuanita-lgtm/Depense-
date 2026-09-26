type ExpenseStatus= "CONFIRMED"|"UNCONFIRMED";

export interface IExpense{
    id:number;
    label:string;
    amount:number;
    categoryId:number;
    date:string;
    status:ExpenseStatus;
};

