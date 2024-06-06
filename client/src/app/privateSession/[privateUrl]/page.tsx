import { redis } from '@/lib/redis';
import { FC } from 'react'
import PrivateClientPage from './privateClientPage';

interface pageProps {
  privateInput : string;
}

const page: FC<pageProps> = async ({ privateInput }) => {
  
    const topic = privateInput;

    console.log(topic)

    const initialData = await redis.zrange<(string | number)[]> (
        `room:${topic}`,0,49,{
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

    return <PrivateClientPage initialData={words} />
}

export default page