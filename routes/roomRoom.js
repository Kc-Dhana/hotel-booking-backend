import express from "express";
import { createRooms, deleteRoom, findRoomById, getRooms, updateRoom } from "../controllers/roomController.js";


const roomRouter = express.Router()

roomRouter.post("/",createRooms)

roomRouter.get("/",getRooms)

roomRouter.get("/:roomId",findRoomById)

roomRouter.delete("/:roomId",deleteRoom)

roomRouter.put("/:roomId",updateRoom)

export default roomRouter;
