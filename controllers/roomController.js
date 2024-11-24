import Room from "../models/room.js";
import { isAdminValid } from "./userControllers.js";

export function createRooms(req, res) {
    if(!isAdminValid(req)){     //admin faluse nam if eke code run wenwa .isAdminValid methode eke usercontroller eken
        res.status(403).json({
            message:"Unauthorized"
        })
        return
       }
    const newRoom = newRoom(req.body)
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
