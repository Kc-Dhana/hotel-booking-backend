import GalleryItem from "../models/galleryItem.js"      //.js dana one

                                                        //create gallery item
export function createGalleryItem(req,res){

    const user = req.user                               //index.js eke midelware eken userwa ewanne req eke dala
    if(user == null){                                   //user kenek nattam
        res.status(403).json({
            message : "Please login to create a gallery item"
        })
        return                                          //createGalleryItem fun eka methanin nawattanwa.nattam pallaha code run wenwa retrun damme nattam
    }
    if(user.type != "admin"){                           //user admin ekenk neme nam
        res.status(403).json({
            message : "you dont have permmission to create a gallery item"
        })
        return                                          //createGalleryItem fun eka methanin nawattanwa.nattam pallaha code run wenwa retrun damme nattam
    }

    const galleryItem = req.body

    const newGalleryItem = new GalleryItem(galleryItem)
    newGalleryItem.save().then(
        ()=>{
            res.json({
                message : "gallery Item created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Gallery item creation failed"
            })
        }
    )
}
export function getGalleryItem(req,res){
    GalleryItem.find().then(
        (list)=>{
            res.json({
                list : list
            })
        }
    )
}
export function deleteGalleryItem(req,res){
    const user = req.user                               //index.js eke midelware eken userwa ewanne req eke dala
    if(user == null){                                   //user kenek nattam
        res.status(403).json({
            message : "Please login to create a gallery item"
        })
        return                                          //createGalleryItem fun eka methanin nawattanwa.nattam pallaha code run wenwa retrun damme nattam
    }
    if(user.type != "admin"){                           //user admin ekenk neme nam
        res.status(403).json({
            message : "you dont have permmission to create a gallery item"
        })
        return                                          //createGalleryItem fun eka methanin nawattanwa.nattam pallaha code run wenwa retrun damme nattam
    }
    const id = req.params.id
    GalleryItem.findByIdAndDelete(id).then(
        ()=>{
            res.json({
                message : "Gallery Item deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Gallery Item deletion failed"
            })
        }
    )
}
export function updateGalleryItem(req,res){
    const user = req.user                               //index.js eke midelware eken userwa ewanne req eke dala
    if(user == null){                                   //user kenek nattam
        res.status(403).json({
            message : "Please login to create a gallery item"
        })
        return                                          //createGalleryItem fun eka methanin nawattanwa.nattam pallaha code run wenwa retrun damme nattam
    }
    if(user.type != "admin"){                           //user admin ekenk neme nam
        res.status(403).json({
            message : "you dont have permmission to create a gallery item"
        })
        return                                          //createGalleryItem fun eka methanin nawattanwa.nattam pallaha code run wenwa retrun damme nattam
    }
    const id = req.params.id
    GalleryItem.findByIdAndUpdate(id,req.body).then(
        ()=>{
            res.json({
                message : "Gallery Item updated successfully"
            })
        } 
    ).catch(
        ()=>{
            res.json({ 
                message : "Gallery Item updation failed"
            })
        }   
    )
}