import { Category } from "../../../models/Categories";

type CategoryBtnProps = {
    category: Category
}

export const CategoryBtn = ({category}: CategoryBtnProps) => {
     const fetchMoviesByCategory = async () : Promise<Category[]> => {
        const API_KEY = import.meta.env.VITE_API_KEY as string;
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=36`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results);
        return data.results;
      };
    return (
        <button className="category_btn" onClick={fetchMoviesByCategory}>
            {category.name}
        </button>
    );
}