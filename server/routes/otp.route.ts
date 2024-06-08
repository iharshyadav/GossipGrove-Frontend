import { Router } from "express";
import { getPrivateRoom, otpSend, postPrivateRoom } from "../controller/otpVerify";
import cors from "cors"

const route = Router()

route.post("/otpVerify",otpSend)
// route.post("/roomSave",postPrivateRoom)
route.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin to access
    credentials: true, 
}))
route.post("/getRoom",getPrivateRoom)

export default route;