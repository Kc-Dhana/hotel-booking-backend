import Feedback from "../models/feedback.js";
import { isCustomerValid } from "./userControllers.js";


export  function createFeedback(req, res){
    if(!isCustomerValid(req)){
        res.status(403).json({
            message: "Forbidden",
          });
          return;
    }
    const newFeedback = new Feedback(req.body);

    newFeedback.save()
        .then((result) => {
            res.status(201).json({
                message: "Feedback created successfully",
                result: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Feedback creation failed",
                error: err
            });
        });
}