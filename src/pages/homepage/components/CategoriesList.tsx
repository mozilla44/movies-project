import { Category } from "../../../models/Categories";
import { CategoryBtn } from "./CategoryBtn";

type CategoriesListProps = {
    categories: Category[];
    setCategoryId: (categoryID: number) => void,


}

export const CategoriesList = ({categories,setCategoryId}: CategoriesListProps) => {
    return (
            <div className="category_btn_area">
                {categories.map(category => (
                    <CategoryBtn key={category.id} category={category} setCategoryId={setCategoryId} />
                ))}
            </div>
        );
}