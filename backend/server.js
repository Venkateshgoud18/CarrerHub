import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());
app.use(postRoutes);
app.use(userRoutes);
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected ✅");
    } catch (err) {
        console.error("MongoDB Error ❌:", err.message);
        process.exit(1);
    }
}
connectDB();
const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});