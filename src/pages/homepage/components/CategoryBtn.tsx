import { Category } from "../../../models/Categories";

type CategoryBtnProps = {
    category: Category
}

export const CategoryBtn = ({category}: CategoryBtnProps) => {
    return (
        <button>
            {category.name}
            {category.id}
        </button>
    );
}