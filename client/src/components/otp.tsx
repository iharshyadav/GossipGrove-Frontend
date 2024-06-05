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
}

const Otp: FC<otpProps> = ({
  input
}) => {

  const  {email , setEmail , secretCode , setSecretCode , privateInput} = useGlobalContext();

  console.log(privateInput || "hrsh");

  useEffect(() => {
    const url = Math.floor(Math.random() * 1000000);
    setSecretCode(url);
  },[]);

  const sendOtp = async (e : React.FormEvent) =>{
    console.log("first")
    e.preventDefault();
   await axios.post(`http://localhost:5000/otp/otpVerify`,{
      email,
      secretCode,
      input
    })
    .then((data) =>{
      console.log(data)
    })
    .catch((e) =>{
      console.log(e)
    })
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
                {/* <Input
                  id="paraurl"
                  value={input || "hgfhffhjgcfffjjyjyytryd"}
                  type="text"
                  className="col-span-3"
                /> */}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="otp" className="text-right">
                  Otp
                </Label>
                <Input
                  id="otp"
                  value={secretCode}
                  type="number"
                  className="col-span-3"
                  readOnly
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Otp