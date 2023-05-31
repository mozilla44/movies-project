import { Category } from "../../../models/Categories";
import { MovieType } from "../../../models/Movie";
import  axios  from "axios";

type CategoryBtnProps = {
    category: Category
    moove:MovieType
}


export const CategoryBtn = ({category}: CategoryBtnProps) => {
     const fetchMoviesByCategory = async (categoryId: number) : Promise<MovieType[]> => {
    const API_KEY = import.meta.env.VITE_API_KEY as string;
        try {
            const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`;
            const response = await axios.get<{ results: MovieType[] }>(URL);
            console.log(response.data.results);
            return response.data.results;
          } catch (error) {
            console.log(error);
            throw new Error("Failed to fetch categories"); 
          }
        
      };
    return (
        <button className="category_btn" onClick={()=>fetchMoviesByCategory(category.id)}>
            {category.name}
        </button>
    );
}


/* export const CategoryBtn = ({category}: CategoryBtnProps) => {
    const fetchMoviesByCategory = async (categoryId: number) : Promise<Category[]> => {
       console.log(category.id)
       const API_KEY = import.meta.env.VITE_API_KEY as string;
       const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`;
       const response = await fetch(url);
       const data = await response.json();
       return data.results;
       
     };
   return (
       <button className="category_btn" onClick={()=>fetchMoviesByCategory(27)}>
           {category.name}
       </button>
   );
} */