import { Otp } from "../models/otp.models";

export const otpSend = async (req,res) =>{

  console.log(req.body);
  const { email , secretCode , paraurl } = req.body;
  console.log(paraurl)

  if(!email || !secretCode) {
    throw new Error("please fill all the details");
  }

  const sameEmail = await Otp.findOne({email});

  if(sameEmail){
     throw new Error ("Otp already sent");
  }

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

}