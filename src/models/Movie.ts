export interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
  release_date: string;
  genres:Array<{name: string, id: number}>;
  overview:string;
  runtime:number;
  production_countries:Array<{name:string}>; // {name: string}[]
  backdrop_path: string;
  vote_average:string;
}