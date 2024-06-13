"use client"

import { redis } from '@/lib/redis';
import { FC } from 'react'
import PrivateClientPage from './privateClientPage';

interface pageProps {
  params : {
    privateUrl : string;
  }
}

const page: FC<pageProps> = async ({ params }) => {
    const { privateUrl } = params;

    console.log(privateUrl)

    const initialData = await redis.zrange<(string | number)[]> (
        `room:${privateUrl}`,0,49,{
            withScores : true
        })

    const words : {text : string; value : number}[] = [];    

    for(let i=0;i<initialData.length;i++){

        const [text,value] = initialData.slice(i,i+2);

        if (typeof text === "string" && typeof value === "number") {
            words.push({ text, value })
          }
    }

    await redis.incr("served-request")

    return <PrivateClientPage initialData={words} topicName={privateUrl} />
}

export default page