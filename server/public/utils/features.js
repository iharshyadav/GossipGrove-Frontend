"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieOptions = {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
};
const sendToken = (res, otpDetails, code, message) => {
    const token = jsonwebtoken_1.default.sign({ _id: otpDetails._id, room: otpDetails.room }, process.env.JWT_SECRET);
    const { room } = otpDetails;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    console.log(token);
    return res.status(code).cookie("access-token", token, cookieOptions).json({
        success: true,
        message,
        // token, 
        room: decoded.room
    });
};
exports.sendToken = sendToken;
//# sourceMappingURL=features.js.map