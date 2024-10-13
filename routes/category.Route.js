import express from "express";
import { createCategory, deleteCategory, viewCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router()

categoryRouter.post("/",createCategory)
categoryRouter.get("/",viewCategory)

categoryRouter.delete("/:name",deleteCategory)  //jsone eke delete karanna one userwa ewanne nathuwa url ekema dala apuwama
                                //url eke dala ewana uswer ganna vidiya
    


export default categoryRouter;