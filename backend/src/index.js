
import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth" , authRoutes)   
//  aa jyare User aa Auth Route par jase toh aa "authRoutes" will be called.  
//  Suppose, user visit /api/auth/{signup or login or logout} it will redirect to page "authRoutes" where we written it's logic using "express". 

app.use("/api/message" , messageRoutes)

app.listen(PORT, () => {
    console.log("Server is running on PORT : " + PORT );
    connectDB();
})