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
import randomString from "randomstring"
import axios from 'axios'
  

interface otpProps {


  
}

const Otp: FC<otpProps> = ({}) => {

  const  {email , setEmail , secretCode , setSecretCode} = useGlobalContext();


  useEffect(() => {
    const url = Math.floor(Math.random() * 1000000);
    setSecretCode(url);
  },[]);

  const sendOtp = async () =>{
    axios.post(`${process.env.BASE_URL}/otpVerify`,{
      email,
      secretCode
    })
    .then((data) =>{
      console.log(data)
    })
    .catch((e) =>{
      console.log(e)
    })
  }

  return <div>
     <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='bg-black text-white '>Share Code</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
            Enter the email to send the Secret code...
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input id="name" onChange={ ({target}) => setEmail(target.value)} value={email} type='email' className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="username" className="text-right">
              
            </Label> */}
            <Input id="username" value={secretCode} type='text' className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onSubmit={sendOtp}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


  </div>
}

export default Otp