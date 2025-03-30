
//  Here, the logic for User Login/Logout and Sign-Up will be return.

import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//  ahiya khali route aapela che now, enu logic is present in Controllers.

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" ,logout);

//  This section should not accessible by everyone directly, for this user must be authenticated first.
//  Therefore, we will make an  "protectRoute" middleware.
//  This middleware are used for "subsequent requests" like in between , when user want to send message , when user want to update profile.
//  This are things for which user must be authenticated first.

router.post("/update-profile" , protectRoute , updateProfile);

router.get("/check", protectRoute , checkAuth);

export default router;
