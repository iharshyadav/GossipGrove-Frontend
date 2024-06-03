"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpSend = void 0;
const otp_models_1 = require("../models/otp.models");
const otpSend = async (req, res) => {
    console.log(req.body);
    const { email, secretCode, paraurl } = req.body;
    console.log(paraurl);
    if (!email || !secretCode) {
        throw new Error("please fill all the details");
    }
    const sameEmail = await otp_models_1.Otp.findOne({ email });
    if (sameEmail) {
        throw new Error("Otp already sent");
    }
    const otp = await otp_models_1.Otp.create({
        email,
        secretCode
    });
    if (!otp) {
        throw new Error("Not saved to database");
    }
    console.log(otp);
    return res.status(200).json({
        message: "Otp saved",
        otp
    });
};
exports.otpSend = otpSend;
//# sourceMappingURL=otpVerify.js.map