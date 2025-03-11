import express from "express";
import { approveFeedback, createFeedback, getAdminFeedbacks, getFeedbacks, getUserFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

// Create a new feedback
feedbackRouter.post("/", createFeedback);

// // Get all approved feedbacks for public view
feedbackRouter.get("/", getFeedbacks);

// // Admin approves feedback
feedbackRouter.put("/approve/:feedbackId", approveFeedback);

// // Get all feedbacks (for admin, including unapproved ones)
feedbackRouter.get("/admin", getAdminFeedbacks);

// Get feedback for a specific logged-in user (Customer Dashboard)
feedbackRouter.get("/my-feedbacks", getUserFeedback);

export default feedbackRouter;