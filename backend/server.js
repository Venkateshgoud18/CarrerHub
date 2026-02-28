import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
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

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});