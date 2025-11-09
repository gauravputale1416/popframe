import { model, Model,Schema } from "mongoose";

const movieSchema= new Schema({
    title :{type:string},
    description:{type:string},
    images:[string],
    category:{type:string},
    director:{type:string},
    year:{type:string},
    language: {type:string},
    rating:{type:string} ,
})
const Movie = model("Movie",movieSchema);

export default Movie;