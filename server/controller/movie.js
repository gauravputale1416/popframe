import Movie from "../models/Movies.js";


const getAllMovies =async (req,res)=>{
    const allMovies=await Movie.find();

    res.json({
        success:true,
        message:"all movies",
        data:allMovies,

    });
}

const postMovie =async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: "Request body is required" });
    }

    const { title, description, images, category, year, language, rating } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" });
    }

    try {
        const movie = new Movie({ title, description, images, category, year, language, rating });
        const savedMovie = await movie.save();
        return res.status(201).json({ message: "Movie added successfully", success: true, data: savedMovie });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error processing request", error: error.message });
    }
}
const searchMoviesById = async (req, res) => {
    const { id }=req.params;
try{
    const  movie= await Movie.findOne({_id:id});
    if(movie){
        res.json({
            success:true,
            message:"movie found",
            data:movie,
        })
    }   else{
        res.json({
            success:false,
            message:"movie not found",
        })
    }
}catch(error){
    res.status(500).json({
        success:false,
        message:"error processing request",
        error:error.message,
    });}
}

const searchMovies = async (req, res) => {
    const { q } = req.query;
    try {
        const movies = await Movie.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
            ]
        });
     
        res.status(200).json({
            success: true,
            message: "search results",
            data: movies,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "error processing request",
            error: error.message,
        });
    }

}


export{getAllMovies,postMovie ,searchMovies,searchMoviesById};