
import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./lib/socket.js"


import path from "path";

// const app = express();  after socket creation remove this.

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve(); //  path ma jya sudhi aapde javu hoy tyare __dirname use karvu pade che.


app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

app.use("/api/auth" , authRoutes)   
//  aa jyare User aa Auth Route par jase toh aa "authRoutes" will be called.  
//  Suppose, user visit /api/auth/{signup or login or logout} it will redirect to page "authRoutes" where we written it's logic using "express". 

app.use("/api/messages" , messageRoutes) 

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/Chat_Application/frontend/dist")))  // check this
    app.get("*" , (req,res) => {
        res.sendFile(path.join(__dirname, "/Chat_Application" , "frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    console.log("Server is running on PORT : " + PORT );
    connectDB();
})