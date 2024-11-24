import express from "express";
import { createCategory, deleteCategory, getCategoryByName, updateCategory, viewCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router()

categoryRouter.post("/",createCategory)

categoryRouter.get("/",viewCategory)

categoryRouter.get("/:name",getCategoryByName)

categoryRouter.delete("/:name",deleteCategory)  //jsone eke delete karanna one userwa ewanne nathuwa url ekema dala apuwama
                                //url eke dala ewana uswer ganna vidiya
                                //parese walin ena ewa meh file eke anthimata dagana . nattam error enne puluwan

categoryRouter.put("/:name",updateCategory) //ctrl and space press karanwa import karana auto avilla thibbe nattam
    


export default categoryRouter;