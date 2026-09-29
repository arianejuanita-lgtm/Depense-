import { Category } from "@/domain/Category";
import { ApiUrl } from "../datasources/ApiUrl";

interface ICategoryRepositrory {
  getCategory(): Promise<Category[]>;
}

export class CategororyRepository implements ICategoryRepositrory {
  async getCategory(): Promise<Category[]> {
    const response = await ApiUrl.get("");
    const items = response.data.record.categories;

    return items.map(
      (item: Category) =>
        new Category({
          id: item.id,
          label: item.label,
        }),
    );
  }
}
