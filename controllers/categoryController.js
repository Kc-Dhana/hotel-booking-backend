import Category from "../models/category.js"

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