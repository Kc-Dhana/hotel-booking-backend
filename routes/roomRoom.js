import express from "express";
import { createRooms, deleteRoom, findRoomById, getRooms, getRoomsByCategory, searchRooms, updateRoom } from "../controllers/roomController.js";


const roomRouter = express.Router()


roomRouter.get("/search", searchRooms);
roomRouter.get("/by-category/:category",getRoomsByCategory)

roomRouter.post("/",createRooms)
roomRouter.get("/",getRooms)
roomRouter.get("/:roomId",findRoomById)
roomRouter.put("/:roomId",updateRoom)
roomRouter.delete("/:roomId",deleteRoom)





export default roomRouter;
