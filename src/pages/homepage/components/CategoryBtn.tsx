import { Category } from "../../../models/Categories";
import { MovieType } from "../../../models/Movie";

type CategoryBtnProps = {
    category: Category
    // You don't use movie prop
    movie?:MovieType
   setCategoryId: (categoryID: number) => void,
    
}


export const CategoryBtn = ({category,setCategoryId}: CategoryBtnProps) => {
    return (
        <button className="category_btn" onClick={()=>setCategoryId(category.id)}>
            {category.name}
        </button>
    );
}


