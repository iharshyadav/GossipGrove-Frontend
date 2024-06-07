import { Response } from "express";
import jwt from "jsonwebtoken"


interface cookie {
    sameSite: boolean | 'none' | 'lax' | 'strict'; 
    httpOnly: boolean; 
    secure: boolean;
}

interface otpInterface {
   secretCode : number;
   email : string;
   room : string;
   _id : string
}

const cookieOptions:cookie = {
    // maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}

export const sendToken = (res:Response,otpDetails:otpInterface,code:number,message:string) =>{

  const token = jwt.sign({ _id: otpDetails._id } , process.env.JWT_SECRET);

  const { room } = otpDetails
  console.log(room)

  return res.status(code).cookie("access-token",token,cookieOptions).json({
      success:true,
      message,
      room
  }) 
      
}