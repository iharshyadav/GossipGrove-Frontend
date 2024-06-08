import { Router } from "express";
import { getPrivateRoom, otpSend, postPrivateRoom } from "../controller/otpVerify";
import cors from "cors"

const route = Router()

route.post("/otpVerify",otpSend)
// route.post("/roomSave",postPrivateRoom)
const allowedOrigins = ['http://localhost:3000', 'https://realtime-webapp.vercel.app'];
route.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}))
route.post("/getRoom",getPrivateRoom)

export default route;