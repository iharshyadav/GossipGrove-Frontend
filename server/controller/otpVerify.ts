import { Request, Response } from "express";

export const otpVerify = async (req:Request,res:Response) =>{

  const { email , secretCode } = req.body;

  console.log(email,secretCode)
}