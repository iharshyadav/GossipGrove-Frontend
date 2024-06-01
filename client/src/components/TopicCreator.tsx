"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useMutation } from "@tanstack/react-query"
import { createTopic } from "@/app/action"

const TopicCreator = () => {
  const [input, setInput] = useState<string>("");

  const {mutate , isPending , error} = useMutation({
    mutationFn : createTopic
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
            Create
          </Button>
        </div>
        {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
      </div>
      <div className="flex items-center justify-center mt-6 gap-2">
        <hr className="w-72 border-[1px]" />
        <h1>OR</h1>
        <hr className="w-72 border-[1px]" />
      </div>
      <h1 className="text-3xl mb-6 mt-5 font-bold underline">Create Private Session</h1>
      <div className="flex gap-2">
          {/* <Input
            value={input}
            onChange={({ target }) => setInput(target.value)}
            className="bg-white min-w-64"
            placeholder="Enter topic here..."
          />
          <Button
            disabled={isPending}
            onClick={() => mutate({ topicName: input })}
          >
            Create
          </Button> */}
        </div>
    </>
  );
}

export default TopicCreator