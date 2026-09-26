type ExpenseStatus= "CONFIRMED"|"UNCONFIRMED";

export interface IExpense{
    id:number;
    label:string;
    amount:number;
    categoryId:number;
    date:string;
    status:ExpenseStatus;
};

// export class Expense{
//     public id:number;
//     public label : string;
//     public amount : number;
//     public category :string;
//     public date :string;
//     public status: ExpenseStatus;

//     constructor(expense: IExpense){
//         this.id = expense.id;
//         this.label= expense.label;
//         this.amount= expense.amount;
//         this.category=expense.category;
//         this.date=expense.date;
//         this.status=expense.status;
//     }

//     public toJSON() {
//         return{
//             id:this.id,
//             label:this.id,
//             amount:this.amount,
//             category:this.category,
//             date:this.date,
//             status:this.status
//         }
//     }
// }