"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otpVerify_1 = require("../controller/otpVerify");
const cors_1 = __importDefault(require("cors"));
const route = (0, express_1.Router)();
route.post("/otpVerify", otpVerify_1.otpSend);
// route.post("/roomSave",postPrivateRoom)
route.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Allow only this origin to access
    credentials: true,
}));
route.post("/getRoom", otpVerify_1.getPrivateRoom);
exports.default = route;
//# sourceMappingURL=otp.route.js.map