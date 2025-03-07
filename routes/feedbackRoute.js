import express from "express";
import { createFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

// Create a new feedback
feedbackRouter.post("/", createFeedback);

export default feedbackRouter;