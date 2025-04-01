import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

// ✅ FIX: Use POST for sending messages
router.post("/send/:id", protectRoute, sendMessage);
router.get("/users", protectRoute, getUsersForSidebar);

// ✅ FIX: Keep dynamic route (`/:id`) at the bottom
router.get("/:id", protectRoute, getMessages);

export default router;
