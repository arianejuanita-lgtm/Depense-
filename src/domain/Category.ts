export interface ICategory{
    id:number;
    label:string;
}

export class Category{
    public id:number;
    public label: string;

    constructor(category:ICategory){
        this.id = category.id;
        this.label = category.label;
    }

    public toJSON(){
        return{
            id:this.id,
            label:this.label
        }
    }
}