import express from "express";
import { createRooms, deleteRoom, findRoomById, getRooms, getRoomsByCategory, updateRoom } from "../controllers/roomController.js";


const roomRouter = express.Router()

roomRouter.post("/",createRooms)
roomRouter.delete("/:roomId",deleteRoom)
roomRouter.get("/",getRooms)
roomRouter.get("/by-category/:category",getRoomsByCategory)
roomRouter.get("/:roomId",findRoomById)
roomRouter.put("/:roomId",updateRoom)

export default roomRouter;
