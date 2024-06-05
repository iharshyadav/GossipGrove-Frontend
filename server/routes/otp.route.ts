import { Router } from "express";
import { otpSend } from "../controller/otpVerify";
import { myfunction } from "../helper/email";

const route = Router()

route.post("/otpVerify",myfunction,otpSend)

export default route;