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
import { io } from "socket.io-client"
import { submitComment } from "@/app/action";
import { useGlobalContext } from "@/app/Context/store";
import { useParams } from "next/navigation";
import Otp from "@/components/otp";

const socket = io("https://realtime-webapp-backend.vercel.app")

interface clientPageProps {
  initialData: { text: string; value: number }[];
  topicName: string;
}

const COLORS = ["#143059", "#2F6B9A", "#82a6c2"]

const PrivateClientPage: FC<clientPageProps> = ({ initialData, topicName  }) => {

  const [words, setWords] = useState(initialData);
  const [input,setInput] = useState<string>("")

  const { privateInput } = useGlobalContext();

  const para = useParams()

  // console.log(para.privateUrl)

  useEffect(()=>{
    socket.emit("join-room",`room:${para.privateUrl}`);
  },[])
  
  const harsh:string = Array.isArray(para.privateUrl) ? para.privateUrl[0] : para.privateUrl;

  // parsing the data from the message into JSON.
  // mapping the data in which we are checking if that word exist.
  // if its already exist then we are incrementing that word.
  // we are setting the word while giving condition first finding the word and then filtering the whole array that does not contain that word
  // then returning the fitered array and incrementing the word by 1
  // In else condition we are checking if the word is less than 50 then add to a array of words;
  
  useEffect(()=>{
   socket.on("room-update",(message:string) =>{
    
    const data = JSON.parse(message) as {
      text : string,
      value : number
    }[]

    data.map((newWord) =>{
      const isWordAlreadyExist = words.some(
        (word) => word.text === newWord.text
      )

      if(isWordAlreadyExist){

        setWords((prev) =>{
          const before = words.find(word => word.text === newWord.text)
          const after = words.filter(word => word.text === newWord.text)

          return [
            ...after,
            {text : before!.text , value : before!.value + newWord.value}
          ]
        })
      } else if(words.length < 50){
        
        setWords((prev) => [...prev, newWord])
      }
   })
  })

  return () =>{
    socket.off("room-update")
  }
  },[words])


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
          <span className="text-blue-600">{privateInput}</span>:
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
            Here&apos;s what I think about {privateInput}
          </Label>
          <div className="mt-1 flex gap-2 items-center">
            <Input
              value={input}
              onChange={({ target }) => setInput(target.value)}
              placeholder={`${privateInput} is absolutely...`}
            />
            <Button
              disabled={isPending}
              onClick={() => {mutate({comment : input , topicName : harsh}); setInput("")}}
            >
              Share
            </Button>
          </div>
          <div className="absolute bottom-20 right-36">
           <Otp input = {input} />
           </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PrivateClientPage;
