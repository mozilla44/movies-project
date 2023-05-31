import { Category } from "../../../models/Categories";
import { MovieType } from "../../../models/Movie";
import { fetchMoviesByCategory } from "../../../api/movieAPI";

type CategoryBtnProps = {
    category: Category
    movie?:MovieType
}


export const CategoryBtn = ({category}: CategoryBtnProps) => {
    return (
        <button className="category_btn" onClick={()=>fetchMoviesByCategory(category.id)}>
            {category.name}
        </button>
    );
}


