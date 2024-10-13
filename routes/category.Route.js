import express from "express";
import { createCategory, deleteCategory, getCategoryByName, viewCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router()

categoryRouter.post("/",createCategory)

categoryRouter.get("/",viewCategory)

categoryRouter.get("/:name",getCategoryByName)

categoryRouter.delete("/:name",deleteCategory)  //jsone eke delete karanna one userwa ewanne nathuwa url ekema dala apuwama
                                //url eke dala ewana uswer ganna vidiya
                                //parese walin ena ewa meh file eke anthimata dagana . nattam error enne puluwan
    


export default categoryRouter;