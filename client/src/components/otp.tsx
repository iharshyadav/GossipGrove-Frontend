"use client"

import { FC, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useGlobalContext } from '@/app/Context/store'
import axios from 'axios'
  

interface otpProps {
 
  input :  string ;
  room : string | string[];
}

const Otp: FC<otpProps> = ({
  input,
  room
}) => {

  const  {email , setEmail , secretCode , setSecretCode} = useGlobalContext();

  // console.log(privateInput || "hrsh");

  useEffect(() => {
    const url = Math.floor(100000 + Math.random() * 900000)
    setSecretCode(url);
  },[]);

  const sendOtp = async (e : React.FormEvent) =>{
    console.log("first")
    e.preventDefault();
   try {
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/otp/otpVerify`,{
      email,
      secretCode,
      room
    })
    .then((data) =>{
      console.log(data)
    })
    .catch((e) =>{
      console.log(e)
    })
   } catch (error) {
    console.error(error);
   }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-black text-white ">
            Share Code
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={sendOtp}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Enter the email to send the Secret code...
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  onChange={({ target }) => setEmail(target.value)}
                  value={email}
                  type="email"
                  className="col-span-3"
                />
                <Label htmlFor="email" className="text-right">
                  Room
                </Label>
                <Input
                  id="room"
                  value={room}
                  type="text"
                  className="col-span-3"
                  readOnly
                  
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="otp" className="text-right">
                  Otp
                </Label>
                <Input
                  id="secretCode"
                  value={secretCode}
                  type="number"
                  className="col-span-3"
                  readOnly
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Code</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Otp