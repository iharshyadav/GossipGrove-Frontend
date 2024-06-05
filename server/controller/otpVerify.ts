import { Request, Response } from "express";
import { Otp } from "../models/otp.models";
import { myfunction } from "../helper/email";

export const otpSend = async (req:Request,res:Response) =>{

 try {
   // console.log(req.body);
   const { email , secretCode  } = req.body;
   // console.log(paraurl)
 
   if(!email || !secretCode) {
     throw new Error("please fill all the details");
   }
 
   const sameEmail = await Otp.findOne({email});
 
   if(sameEmail){
      throw new Error ("Otp already sent");
   }

   await myfunction(req,email,secretCode,res);
 
   const otp = await Otp.create({
     email,
     secretCode
   })
 
   if(!otp){
     throw new Error("Not saved to database");
   }
 
 
   console.log(otp);
 
   return res.status(200).json({
     message : "Otp saved",
     otp
   })
 } catch (error) {
    throw new Error ("Unable to verify email please try again")
 }

}