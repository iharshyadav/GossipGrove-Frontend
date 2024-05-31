"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FC, useEffect, useState } from "react";
import { scaleLog } from "@visx/scale"
import { Wordcloud } from "@visx/wordcloud"
import { Text } from "@visx/text";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { submitComment } from "../action";
import { io } from "socket.io-client"

interface clientPageProps {
  initialData: { text: string; value: number }[];
  topicName: string;
}

const COLORS = ["#143059", "#2F6B9A", "#82a6c2"]

const ClientPage: FC<clientPageProps> = ({ initialData, topicName }) => {

  const [words, setWords] = useState(initialData);
  const [input,setInput] = useState<string>("")


  const socket = io("http://localhost:5000")

  

  useEffect(()=>{
    socket.emit("join-room",`room:${topicName}`);
  },[])

  useEffect(()=>{
   socket.on("room-update",(message : string) =>{
     console.log('room update received',message)
   })
  },[])


  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  })

  const { mutate , isPending } = useMutation({
    mutationFn : submitComment
  })
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-grid-zinc-50 pb-20">
      <MaxWidthWrapper className="flex flex-col items-center gap-6 pt-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-center tracking-tight text-balance">
          What people think about{" "}
          <span className="text-blue-600">{topicName}</span>:
        </h1>
        <p className="text-sm">(updated in real-time)</p>

        <div className="aspect-square max-w-xl flex items-center justify-center">
        <Wordcloud
          words={words}
          width={320}
          height={320}
          fontSize={(data) => fontScale(data.value)}
          font={"Impact"}
          padding={2}
          spiral="archimedean"
          rotate={0}
          random={() => 0.5}
        >
          {(cloudWords) =>
            cloudWords.map((word, index) => (
              <Text
                key={word.text}
                fill={COLORS[index % COLORS.length]}
                textAnchor="middle"
                transform={`translate(${word.x}, ${word.y})`}
                fontSize={word.size}
                fontFamily={word.font}
              >
                {word.text}
              </Text>
            ))
          }
        </Wordcloud>
      </div>
 
      <div className="max-w-lg w-full">
          <Label className="font-semibold tracking-tight text-lg pb-2">
            Here&apos;s what I think about {topicName}
          </Label>
          <div className="mt-1 flex gap-2 items-center">
            <Input
              value={input}
              onChange={({ target }) => setInput(target.value)}
              placeholder={`${topicName} is absolutely...`}
            />
            <Button
              disabled={isPending}
              onClick={() => { mutate({comment : input , topicName}); setInput('')}}
            >
              Share
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ClientPage;
