import { Router } from "express";
import { otpVerify } from "../controller/otpVerify";

const route = Router()

route.post("/otpVerify",otpVerify)