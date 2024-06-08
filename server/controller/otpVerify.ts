import { Request, Response } from "express";
import { Otp } from "../models/otp.models";
import { myfunction } from "../helper/email";
import { PrivateRoom } from "../models/privateRoom.models";
import { sendToken } from "../utils/features";

export const otpSend = async (req:Request,res:Response) =>{

 try {
   console.log(req.body);
   const { email , secretCode ,room } = req.body;
   // console.log(paraurl)
 
   if(!email || !secretCode || !room) {
     throw new Error("please fill all the details");
   }
 
   const sameEmail = await Otp.findOne({email});
 
   if(sameEmail){
      throw new Error ("Otp already sent");
   }

   await myfunction(req,email,secretCode,res);
 
   const otp = await Otp.create({
     email,
     secretCode,
     room
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
    
    const { email , rooms , otp } = req.body;

    if(!email || !rooms || !otp){
     throw new Error("please fill all the details");

    }

    const findByEmail = await Otp.findOne({email});

    if(!findByEmail){
      throw new Error("Failed to join room")
    }

    const { room } = findByEmail;

    // console.log(room)  
    // console.log(rooms)

    if(rooms != room){
     throw new Error("Please Enter the correct room Name")
    }
 
    
    const { secretCode } = findByEmail;
    
    if(otp != secretCode){
      throw new Error ("Invalid Otp!!! Please try again!!!!")
      }
      
    sendToken(res,findByEmail,200,"user entered successfully");

  } catch (error) {
    throw new Error ("failed to store room")
  }
}


export const hashedRoom = async (req:Request , res:Response) =>{

}