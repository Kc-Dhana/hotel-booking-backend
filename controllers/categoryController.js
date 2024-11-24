import Category from "../models/category.js"
import { isAdminValid } from "./userControllers.js"

export function createCategory(req,res){

    const user= req.user
    if(user ==null)
    {
        res.status(403).json({
            message :"Please login to create a gallery item"
        })
        return
    }
    if(user.type != "admin"){
        
        res.status(403).json({
           message:"you dont have permmission to add create category"
        })
        return
    }

    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json({
                message: "Category created successfully",
                result :result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message:"Category creation failed",
                err:err
            })
        }
    )
}
export function viewCategory(req,res){
    Category.find().then(
        (result)=>{
            res.json({
                categories : result 
            })
        }

    ).catch(
        ()=>{
            res.son({
                message : "Failed to get categories"
            })
        }
    )
}
//delete category
export function deleteCategory(req,res){
    if(req.user == null){
      res.status(401).json({
        message : "Unauthorized"
      })
      return
    }
    if(req.user.type != "admin"){
      res.status(403).json({
        message : "Forbidden"
      })
      return
    }
    const name = req.params.name  //req eke url ekeke apu nama variable ekata gannwa
    Category.findOneAndDelete({name:name}).then(
      ()=>{
        res.json(
          {
            message : "Category deleted successfully"
          }
        )
      }
    ).catch(
      ()=>{
        res.json(
          {
            message : "Category deletion failed"
          }
        )
      }
    )
    
}
export function getCategoryByName(req,res){
    const name =req.params.name;
    Category.findOne({name:name}).then(
        (result)=>{
            if(result == null){
                res.json({
                    message:"Category not found"
                })
            }else{
                res.json({
                    category : result
                })
            }
        }
    ).catch(
        ()=>{
            res.json({
                message:"Failed to get category"
            })
        }
    )
}
export function updateCategory(req,res){

   if(!isAdminValid(req)){     //admin faluse nam if eke code run wenwa .isAdminValid methode eke usercontroller eken
    res.status(403).json({
        message:"Unauthorized"
    })
    return
   }

    const name = req.params.name; //req eke url ekeke apu nama variable ekata gannwa
    Category.findOneAndUpdate({name:name},req.body).then( //req eke body eka update karanwa
        ()=>{
            res.json({
                message:"Category updated successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Failed to update category"
            })
        }
    )
}

