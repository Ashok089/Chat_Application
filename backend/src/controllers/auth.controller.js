
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req , res) => {

   const {fullName, email , password}  = req.body
   try {

      if(!fullName || !email || !password) {
        return res.status(400).json({ message : "All fields are required" });  
      }

      if (password.length < 6) {
        return res.status(400).json({ message : "Password must be at least 6 characters" });
      }

      //  This will check if user already exists in Database by checking Email.
      const user = await User.findOne({email})
      if (user) return res.status(400).json({ message : "Email already exists" });

      //  This will do hashing of password.
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password , salt) 

      //  This will create newUser in Database.
      const newUser = new User({
        fullName,   // fullName: fullName
        email,      // email:email,
        password: hashedPassword
      })

      //  Once, newUser is created generate token for it, so it get access to that website.
      //  Using jwt token we will verify user authentication and provide him session .

      if(newUser) {
        //  generate jwt token here.
       generateToken(newUser._id , res)
       await newUser.save(); 

       res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,

       });

      } else {
        res.status(400).json({ message: "Invalid user data" });    
      }

   } catch (error) {
      console.log("Error in Signup controller" , error.message);   
      res.status(500).json({ message: "Internal Server Error" });    

   }
}

export const login = async (req , res) => {

    const { email,password } = req.body

    try {
      const user = await User.findOne({email})
     
      if(!user) {
        return res.status(400).json({message : "Invalid credentials" })
      } 

      const isPasswordCorrect = await bcrypt.compare(password , user.password);
      if(!isPasswordCorrect) {
        return res.status(400).json({ message : "Invalid credentials" });
      } 

      generateToken(user._id , res)

      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,

       });

    } catch (error) {
      console.log("Error in login controller" , error.message);
      res.status(500).json({ message : "Internal Server Error" });
    }
}

export const logout = (req , res) => {
    try {
        res.cookie("jwt" , "" , {maxAge:0})
        res.status(200).json({ message : "Logged out successfully" });

    } catch (error) {
      console.log("Error in Logout controller" , error.message);
      res.status(500).json({ message : "Internal Server Error" });
    }
    
}


export const updateProfile = async (req,res) => {
    try {

      const {profilePic} = req.body;
      const userID = req.user._id;
       
      if(!profilePic) {
        return res.status(400).json({ message : "Profile pic is required" });
      }

     const uploadResponse =  await cloudinary.uploader.upload(profilePic)
     const updateUser = await User.findByIdAndUpdate(userId , {profilePic: uploadResponse.secure_url} , {new:true})

     res.status(200).json(updateUser);

    } catch (error) {
      
      console.log("error in update profile:", error );
      res.status(500).json({ message : "Internal server error" });
    }
}


export const checkAuth = (req,res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller:", error );
    res.status(500).json({ message : "Internal server error" });
  }
}
