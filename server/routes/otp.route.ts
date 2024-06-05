import { Router } from "express";
import { getPrivateRoom, otpSend, postPrivateRoom } from "../controller/otpVerify";

const route = Router()

route.post("/otpVerify",otpSend)
route.post("/roomSave",postPrivateRoom)
route.get("/getRoom",getPrivateRoom)

export default route;