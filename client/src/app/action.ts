"use server"

import { redis } from "@/lib/redis"
import { redirect } from "next/navigation"

export const createTopic = async ({topicName} : {topicName : string}) =>{


    const regex = /^[a-zA-Z-]+$/

    console.log(topicName)

    if(!topicName || topicName.length > 50){
        throw ({error : "Name must be between 1 and 50 chars" })
    };

    if(!regex.test(topicName)){
        return { error: "Only letters and hyphens allowed in name" }
    }

    await redis.sadd("existing-topics", topicName);

     redirect (`/${topicName}`)
}


function wordFreq (text : string):{text : string ; value : number}[]{
  
    const words: string[] = text.replace(/\./g, "").split(/\s/);
    const freqMap: Record<string, number> = {}

    for(const w of words){
        if (!freqMap[w]) freqMap[w] = 0
        freqMap[w] += 1;
    }

//   Converts a frequency map to an array of objects with text and value properties.
//   @param {Object} freqMap - An object where keys are words and values are their frequencies.
//  @returns {Array} An array of objects, each containing a word and its frequency.

    return Object.keys(freqMap).map((word) => ({
        text: word,
        value: freqMap[word],
      }))
}


// assigning variable(words) to wordfreq function where he returns the value and store it
// resolving all the words and mapping them in the database with unique set 
// increamenting served request
// publishing in redish 
// returning comment
export const submitComment = async ({
    comment,
    topicName
}:{
   comment : string
   topicName : string
}) =>{

    const words = wordFreq(comment);

    await Promise.all(
        words.map( async (word) => {
            await redis.zadd(
                `room:${topicName}`,
                {incr : true},
                { member : word.text , score : word.value }
            )
           })
          )

    await redis.incr("served-request")

    await redis.publish(`room:${topicName}`,words)

    return comment;
}


export const createTopicParams = async ({topicName , params} : {topicName : string ; params : string}) =>{

    const regex = /^[a-zA-Z-]+$/


    if(!topicName || topicName.length > 50){
        throw ({error : "Name must be between 1 and 50 chars" })
    };

    if(!regex.test(topicName)){
        return { error: "Only letters and hyphens allowed in name" }
    }

    await redis.sadd("existing-topics", topicName);

     redirect (`/privateSession/${params}`)
}



