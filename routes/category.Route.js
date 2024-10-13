import express from "express";
import { createCategory, viewCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router()

categoryRouter.post("/",createCategory)
categoryRouter.get("/",viewCategory)

export default categoryRouter;