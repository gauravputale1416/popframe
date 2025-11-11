
import { model,Schema } from "mongoose";

const movieSchema= new Schema({
    title :{type:String},
    description:{type:String},
    images:[String],
    category:{type:String},
    director:{type:String},
    year:{type:Number},
    language: {type:String},
    rating:{type:Number} ,
})
const Movie = model("Movie",movieSchema);

export default Movie;