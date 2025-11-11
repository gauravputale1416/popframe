import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"
import { getAllMovies,postMovie, searchMovies ,searchMoviesById } from "./controller/movie.js"

dotenv.config()

const app = express();
app.use(express.json());      
app.use(cors());

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URL || process.env.MONGO_URI;
        if (!mongoUri) {
            console.error("Missing MongoDB connection string. Set MONGODB_URL or MONGO_URI in .env");
            process.exit(1);
        }
        const conn = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (conn) {
            console.log("MongoDB connected");
        }
    } catch (e) {
        console.error("MongoDB connection error:", e.message);
        process.exit(1);
    }
};
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.post("/movies", postMovie);
app.get("/movies", getAllMovies);
app.get("/movies/search", searchMovies);
app.get("/movies/:id", searchMoviesById);

const PORT = process.env.PORT || 1010;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
