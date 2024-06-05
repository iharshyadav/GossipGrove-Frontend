import { Router } from "express";
import { otpSend } from "../controller/otpVerify";

const route = Router()

route.post("/otpVerify",otpSend)

export default route;