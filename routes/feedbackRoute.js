import express from "express";
import { createFeedback, getFeedbacks } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

// Create a new feedback
feedbackRouter.post("/", createFeedback);

// // Get all approved feedbacks for public view
feedbackRouter.get("/", getFeedbacks);

// // Admin approves feedback
// feedbackRouter.put("/:feedbackId/approve", approveFeedback);

// // Get all feedbacks (for admin, including unapproved ones)
// feedbackRouter.get("/admin", getAdminFeedbacks);

export default feedbackRouter;