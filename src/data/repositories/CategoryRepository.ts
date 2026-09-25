import type { ICategory } from "@/domain/Category";
import { CategoryTab } from "../datasources/CategoriesTab";

interface ICategoryRepositrory{
    getCategory():ICategory[];
}

export class CategororyRepository implements ICategoryRepositrory{
    getCategory(): ICategory[] {
        return CategoryTab;
    }
}