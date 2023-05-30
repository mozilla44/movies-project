import { Category } from "../../../models/Categories";

type CategoryBtnProps = {
    category: Category
}

export const CategoryBtn = ({category}: CategoryBtnProps) => {
    return (
        <button className="category_btn">
            {category.name}
            
        </button>
    );
}