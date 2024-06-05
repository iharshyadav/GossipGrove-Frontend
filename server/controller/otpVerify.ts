import { Request, Response } from "express";
import { Otp } from "../models/otp.models";
import { myfunction } from "../helper/email";
import { PrivateRoom } from "../models/privateRoom.models";

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

export const postPrivateRoom = async (req:Request,res:Response) => {
  try {
    const { privateRoomName } = req.body;
    if(!privateRoomName){
      throw new Error ("please fill the Room name")
    }
    
    const room = await PrivateRoom.create ({
      privateRoomName
    })

    console.log(room);

    return res.status(200).json({
      room,
      message : "room name stored"
    })
  } catch (error) {
    throw new Error ("failed to storenroom")
  }
}

export const getPrivateRoom = async (req:Request,res:Response) => {
  try {
    const privateInput = req.query.privateInput
    console.log(privateInput);
    if(!privateInput){
      throw new Error ("room does not exist")
    }

    const findRoom = await PrivateRoom.findOne({ privateInput })

    if(!findRoom) {
      throw new Error ("error in finding room")
    }

    return res.status(200).json({
      findRoom,
    })
  } catch (error) {
    throw new Error ("failed to store room")
  }
}