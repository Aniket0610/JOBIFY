import express from "express";
import getChatbotResponse from "../controllers/chatbot.controllers.js";


const router = express.Router();

// Route to handle chatbot queries
router.route("/").post(getChatbotResponse); // POST request for chatbot responses

 
export default router;
