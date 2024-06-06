interface pageProps {
  params : {
    topic : string;
  }
}
  
  const page = async ({params} : pageProps) => {

const { topic } = params;

// console.log(topic)
  return <div>
    harsh${topic}
  </div>
}

export default page