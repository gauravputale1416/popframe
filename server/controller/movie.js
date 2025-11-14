import Movie from "../models/Movies.js";


const getAllMovies =async (req,res)=>{
    const allMovies=await Movie.find();

    res.json({
        success:true,
        message:"all movies",
        data:allMovies,

    });
}

const postMovie = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: "Request body is required" });
    }

    const { title, description, images, category, director, year, language, rating } = req.body;

    if (!title || !description || !images || !category || !director || !year || !language) {
        return res.status(400).json({ success: false, message: "Missing required fields: title, description, images, category, director, year, language" });
    }

    try {
        const movie = new Movie({ title, description, images, category, director, year, language, rating });
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

const putMovie=async (req,res)=>{
    const {id}=req.params;
 const {
    title,description,images,category,year,language,rating
}=req.body;
    try{
await Movie.updateOne({_id:id},{
    title,description,images,category,year,language,rating
});
const updatedMovie=await Movie.findOne({_id:id});
res.json({
    success:true,
    message:"movie updated",
    data:updatedMovie,
})
    }catch(error){
        res.status(500).json({
            success:false,
            message:"error processing request",
            error:error.message,
})
    }
}

const putmovieRating=async (req,res)=>{
    const {id}=req.params;
    const {rating}=req.body;

    
    try{
         if(rating<0 || rating>5){
            return req.status(400).json({
                success:false,
                message:"rating should be greter than 0 or less than 5",
                data :null
            })
        }
       
        
        await Movie.updateOne({_id:id},{
            rating
        });


        const updatedMovie=await Movie.findOne({_id:id});
        res.json({
            success:true,
            message:"movie rating updated",
            data:updatedMovie,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"rating should be greter than 0 or less than 5",
            error:error.message,
        });
    }
}

const deleteMovies= async (req ,res)=>{
const { id }=req.params;
 await Movie.deleteOne({_id:id});
 res.json({
    success:true,
    message:"deleted movies",
    data:null
 })

}

const putmovieImages= async (req,res)=>{
    const {id}=req.params;
    const {images}=req.body;
    try{
        await
        Movie.updateOne({_id:id},{
            images
        });
        const updatedMovie=
        await Movie.findOne({_id:id});
        res.json({
            success:true,
            message:"movie images updated",
            data:updatedMovie,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"error processing request",
            error:error.message,
        });
    }
}

export{getAllMovies,postMovie ,searchMovies,searchMoviesById ,putMovie,putmovieRating ,deleteMovies, putmovieImages};