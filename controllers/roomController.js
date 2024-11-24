import Room from "../models/room.js";
import { isAdminValid } from "./userControllers.js";

export function createRooms(req, res) {
    if(!isAdminValid(req)){     //admin faluse nam if eke code run wenwa .isAdminValid methode eke usercontroller eken
        res.status(403).json({
            message:"Unauthorized"
        })
        return
       }
    const newRoom = new Room(req.body)
    newRoom.save().then(
        (result) => {
            res.json(
                {
                message: "Room created successfully",
                result: result
                }
             )
        }
    ).catch(
        (err) => {
            res.json(
                {
                message: "Room creation failed",
                error: err
                }
             )
        }
    )
}
export function deleteRoom(req, res) {
    if(!isAdminValid(req)){     //admin faluse nam if eke code run wenwa .isAdminValid methode eke usercontroller eken
        res.status(403).json({
            message:"Unauthorized"
        })
        return
       }
    const roomId = req.params.roomId
    Room.findoneAndDelete({roomId:roomId}).then(
        () => {
            res.json(
                {
                message: "Room deleted successfully",
                }
             )
        }
    ).catch(
        (err) => {
            res.json(
                {
                message: "Room deletion failed",
                error: err
                }
             )  
        }
    )
}
export function findRoomById(req, res) {
    const roomId = req.params.roomId
    Room.findOne({roomId:roomId}).then(
        (result) => {
            if(result == null){
                res.status(404).json({
                    message: "Room not found"
                })
                return
            }else{
                res.json(
                    {
                    message: "Room found",
                    result: result
                    }
                 )
            }
        
        }
    ).catch(
        (err) => {
            res.json(
                {
                message: "Room search failed",
                error: err
                }
             )  
        }
    )
}
export function getRooms(req, res) {
    Room.find().then(
        (result) => {
            res.json(
                {
                message: "Rooms found",
                result: result
                }
             )
        }
    ).catch(
        (err) => {
            res.json(
                {
                message: "Room search failed",
                error: err
                }
             )  
        }
    )
}
export function updateRoom(req, res) {
    if(!isAdminValid(req)){     //admin faluse nam if eke code run wenwa .isAdminValid methode eke usercontroller eken
        res.status(403).json({
            message:"Unauthorized"
        })
        return
       }
    const roomId = req.params.roomId

    //code give by chatgpt
    Room.findOneAndUpdate({ roomId: roomId }, req.body, { new: true }) // `new: true` returns the updated document
        .then((updatedRoom) => {
            if (!updatedRoom) {
                // No room was found with the given roomId
                res.status(404).json({
                    message: "Room not found",
                });
            } else {
                // Room was successfully updated
                res.json({
                    message: "Room updated successfully",
                    room: updatedRoom,
                });
            }
        })
        .catch((error) => {
            // Handle any errors that occurred during the update
            res.status(500).json({
                message: "Room update failed",
                error: error.message,
            });
        });
    // Room.findOneAndUpdate({roomId:roomId},req.body).then(
    //     () => {
    //         res.json(
    //             {
    //             message: "Room updated successfully",
    //             }
    //          )
    //     }
    // ).catch(
    //     () => {
    //         res.json(
    //             {            
    //             message: "Room update failed", 
    //             }     
    //          )  
    //     }
    // )
}
export function getRoomsByCategory(req, res) {
    const category = req.params.category
    Room.find({category:category}).then(
        (result) => {
            res.json(
                {
                message: "Rooms found",
                result: result
                }
             )
        }
    ).catch(
        (err) => {
            res.json(
                {
                message: "Failed to get rooms",
                error: err
                }
             )  
        }
    )    
}
