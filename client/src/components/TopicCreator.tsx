"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useMutation } from "@tanstack/react-query"
import { createTopic, createTopicParams } from "@/app/action"
import { KeyRound, LockKeyhole } from "lucide-react"
import { useGlobalContext } from "@/app/Context/store"
import JoinRoom from "./joinRoom"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"


const TopicCreator = () => {
  const [input, setInput] = useState<string>("");
  const { privateInput, setPrivateInput } = useGlobalContext();

  
  const {mutate , isPending , error} = useMutation({
    mutationFn : createTopic
  })

  const { mutate: mutate2, isPending: isPending2, error: error2} = useMutation({
    mutationFn : createTopicParams
  })


  return (
    <>
      <div className="mt-12 flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={({ target }) => setInput(target.value)}
            className="bg-white min-w-64"
            placeholder="Enter topic here..."
          />
          <Button
            disabled={isPending}
            onClick={() => mutate({ topicName: input })}
          >
            Create{" "}
            <span className="ml-1">
              <KeyRound size={18} />
            </span>
          </Button>
        </div>
        {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
      </div>
      <div className="flex items-center justify-center mt-6 gap-2">
        <hr className="w-72 border-[1px]" />
        <h1>OR</h1>
        <hr className="w-72 border-[1px]" />
      </div>
      <h1 className="text-3xl mb-6 mt-5 font-bold underline">
        Create Private Session...
      </h1>
      <div className="flex gap-2">
          <Input
            value={privateInput}
            onChange={({ target }) => setPrivateInput(target.value)}
            className="bg-white min-w-64"
            placeholder="Enter topic here..."
          />
          <Button
            disabled={isPending2}
            type="submit"
            onClick={() => mutate2({ topicName: privateInput})}
          >
            Create Room{" "}
            <span className="ml-1">
              <LockKeyhole size={17} />
            </span>
          </Button>
      </div>
      {error2 ? <p className="text-sm text-red-600">{error2.message}</p> : null}

      <div className="mt-8">
        <JoinRoom />
      </div>

      <Button onClick={()=>signIn("google")} className="p-6 text-md mt-7">
        <FcGoogle /> <span className="ml-2"></span>Log In with Google
      </Button>
    </>
  );
}

export default TopicCreator