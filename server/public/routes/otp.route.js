"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otpVerify_1 = require("../controller/otpVerify");
const route = (0, express_1.Router)();
route.post("/otpVerify", otpVerify_1.otpSend);
exports.default = route;
//# sourceMappingURL=otp.route.js.map