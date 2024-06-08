import { Response } from "express";
import jwt from "jsonwebtoken"


interface cookie {
    maxAge : number
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

const cookieOptions: cookie = {
  httpOnly: true,
  maxAge: 15 * 24 * 60 * 60 * 1000,
  secure: true,
  sameSite: "none",
};

export const sendToken = (res:Response,otpDetails:otpInterface,code:number,message:string) =>{

  const token = jwt.sign({ _id: otpDetails._id,room: otpDetails.room } , process.env.JWT_SECRET);

  const { room } = otpDetails
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(token)   

  return res.status(code).cookie("access-token",token,cookieOptions).json({
      success:true,
      message,
      // token, 
      room:decoded.room
  }) 
      
}