// No, there is a misconception here.
// A category, in terms of props is just an id and a name.
// shwo is just for React to handle the logic, it has nothing to do with the object returned by the API
// And genre is rather an array of Category no ? 
export interface Category {
    id: number;
    name: string;
    genres: string
    show?:boolean
    
}
