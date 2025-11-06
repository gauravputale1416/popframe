import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"
dotenv.config()

const app=express();
    app.use(express.json());
    app.use(cors());
const connectDB= async ()=>{

    try{
        const conn=await mongoose.connect(process.env.MONGODB_URL);
        if(conn){
            console.log("mongo-db conected");
            

        }
    }catch(e){
        console.log(`error is ${e.message}`)
    }
    };
  
app.get("/",(res,req)=>{
    res.json({
        message:"server is on ",
    });
});
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`sever is on ${PORT}`);
    connectDB();
})
