
import jwt from "jsonwebtoken"
import user from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {

  // aapde token ma userID aapi che and enu name "jwt" aapelu che.

    try {
       const token = req.cookies.jwt;

    if(!token) {
       return res.status(401).json({ message : "Unauthorized - No Token Provided" });
    } 
       
    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    if(!decoded) {
       return res.status(401).json({ message : "Unauthorized - Invalid Token" });
    }

    if(!user) {
        return res.status(404).json({message : "User not found"});
    }

    req.user = user
    next() 

    } catch (error) {
       console.log("Error in protectRoute middleware: " , error.message);
       res.status(500).json({message : "Internal server error"});

    }
}