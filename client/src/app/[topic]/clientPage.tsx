import { FC } from 'react'

interface clientPageProps {
  initialData : {text:string; value:number }[];
  topicName : string;
}

const clientPage: FC<clientPageProps> = ({}) => {
  return <div>clientPage</div>
}

export default clientPage