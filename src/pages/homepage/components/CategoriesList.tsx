import { Category } from "../../../models/Categories";
import { CategoryBtn } from "./CategoryBtn";

type CategoriesListProps = {
    categories: Category[];
}

export const CategoriesList = ({categories}: CategoriesListProps) => {
    return (
            <div className="categories-list">
                {categories.map(category => (
                    <CategoryBtn key={category.id} category={category} />
                ))}
            </div>
        );
}