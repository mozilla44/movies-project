export interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genres:Array<{name: string, id: number}>;
  overview:string;
  runtime:number;
  production_countries:Array<{name:string}>;
  backdrop_path: string;
}