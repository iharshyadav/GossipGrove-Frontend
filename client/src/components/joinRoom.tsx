"use client"
import { FC, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { KeyRound } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { roomDetails } from '@/app/action'

interface joinRoomProps {
  mail : string;
}

const JoinRoom: FC<joinRoomProps> = ({
  mail
}) => {
const [joinRoomEmail, setJoinRoomEmail] = useState<string>("")
const [joinRoom, setJoinRoom] = useState<string>("")
const [joinOtp, setJoinOtp] = useState<number>(0)

const router = useRouter();

const getVerified = async (e:React.FormEvent) =>{

  // const currentUser = await getCurrentUser(); 
  e.preventDefault();

  
  const currentRoom = await roomDetails(joinRoom);
  
  if(currentRoom !== true){
    return;
    }
  console.log("first")

  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
  await axios
    .post("http://localhost:5000/otp/getRoom", {
      email: mail,
      rooms: joinRoom,
      otp: joinOtp,
    },
   config
  )
    .then((data) => {
      console.log(data)
      // console.log(roomHandler)
      // console.log(data.data.token)
      // middleware(data.data.room)
        // saveOtpStoreRoom(joinRoomEmail , joinRoom)
        router.push(`/privateSession/${joinRoom}`);
      })
    .catch((e) => {
      console.log(e);
    });
  } catch (error) {
    console.log(error)
  }
}
    
  return (
    <div>
      <div >
      <h1 className="text-3xl mb-6 mt-5 font-bold ">
        Join Room...
      </h1>
        <form className="flex gap-2" action="" onSubmit={getVerified}>
          <Input
            value={mail}
            // onChange={({ target }) => setJoinRoomEmail(target.value)}
            className="bg-white min-w-48"
            placeholder="Enter email here..."
            readOnly
            type='hidden'
          />
          <Input
            value={joinRoom}
            onChange={({ target }) => setJoinRoom(target.value)}
            className="bg-white min-w-48"
            placeholder="Enter topic here..."
          />
          <Input
            value={joinOtp}
            onChange={({ target }) => setJoinOtp(parseInt(target.value))}
            className="bg-white min-w-48"
            placeholder="Enter topic here..."
          />
          <Button
          // disabled={isPending}
          // onClick={() => mutate({ topicName: input })}
          type='submit'
          >
            Join Room
            <span className="ml-1">
              <KeyRound size={18} />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom