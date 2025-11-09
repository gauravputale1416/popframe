import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"
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

// Fixed parameter order from (res,req) to (req,res)
app.get("/", (req, res) => {
    res.json({
        message: "server is on",
    });
});

// Fixed parameter order and added request body validation
app.post("/movies", (req, res) => {
    // Check if body exists and is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Request body is required",
        });
    }

    try {
        const {
            title,
            description,
            images,
            category,
            year,
            language,
            rating,
        } = req.body;

        // Validate required fields
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        res.json({
            message: "Movie added successfully",
            success: true,
            data: req.body,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error processing request",
            error: error.message,
        });
    }
});

const PORT = process.env.PORT || 1010;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
