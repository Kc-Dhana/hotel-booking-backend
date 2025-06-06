import Feedback from "../models/feedback.js";
import { isAdminValid, isCustomerValid } from "./userControllers.js";


export function createFeedback(req, res) {
  if (!isCustomerValid(req)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const userId = req.user.id; // Set from token

  const newFeedback = new Feedback({
    ...req.body,
    user: userId,
  });

  newFeedback
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Feedback created successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Feedback creation failed",
        error: err,
      });
    });
}

// Get all approved feedback for public view
export function getFeedbacks(req, res) {
    try {
        Feedback.find({ approved: true })
        .populate('user', 'firstName lastName email image')
            .then((feedbacks) => {
                res.status(200).json({ feedbacks });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error retrieving feedbacks" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving feedbacks" });
    }
}

// Admin approve feedback
export function approveFeedback(req, res) {
    try {
        if (!isAdminValid(req)) { 
            res.status(403).json({
                message: "Forbidden",
            });
            return;
        }

        const { feedbackId } = req.params;

        Feedback.findByIdAndUpdate(feedbackId, { approved: true }, { new: true })
            .then((updatedFeedback) => {
                if (!updatedFeedback) {
                    return res.status(404).json({ message: "Feedback not found" });
                }

                res.status(200).json({ message: "Feedback approved", feedback: updatedFeedback });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error approving feedback" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error approving feedback" });
    }
}
//admin unapprove feedback
export function unapproveFeedback(req, res) {
    try {
        if (!isAdminValid(req)) { 
            return res.status(403).json({ message: "Forbidden" });
        }

        const { feedbackId } = req.params;

        Feedback.findByIdAndUpdate(feedbackId, { approved: false }, { new: true })
            .then((updatedFeedback) => {
                if (!updatedFeedback) {
                    return res.status(404).json({ message: "Feedback not found" });
                }

                res.status(200).json({ message: "Feedback unapproved", feedback: updatedFeedback });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error unapproving feedback" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error unapproving feedback" });
    }
}


// Get feedback for admin (including unapproved ones)
export function getAdminFeedbacks(req, res) {
    try {
        if (!isAdminValid(req)) { 
            res.status(403).json({
                message: "Forbidden",
            });
            return;
        }
        Feedback.find()
            .populate('user', 'firstName lastName email')
            .then((feedbacks) => {
                res.status(200).json({ feedbacks });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error retrieving admin feedbacks" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving admin feedbacks" });
    }
}

// // Get feedback for the logged-in customer
export function getUserFeedback(req, res) {
    try {
        if(!isCustomerValid(req)){
            res.status(403).json({
                message: "Forbidden",
              });
              return;
        }
        const userId = req.user.id;  //user ID is available via the auth middleware

        Feedback.find({ user: userId })
            .then((feedbacks) => {
                res.status(200).json({ feedbacks });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Error retrieving your feedback" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving your feedback" });
    }
}