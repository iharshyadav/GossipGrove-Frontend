"use client"
import axios from 'axios'
import { FC, useEffect } from 'react'

interface pageProps {
  
}

const Page: FC<pageProps> = ({}) => {
    
  useEffect(() =>{
    const response = async () =>{
      await axios.get("/api/data")
      .then((datas) =>{
         console.log(datas)
      })
      .catch((err)=>{
      console.log(err)
      })
    }

    response();
  },[])

  return <div>
    
  </div>
}

export default Page