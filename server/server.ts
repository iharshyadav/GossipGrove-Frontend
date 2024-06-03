import express,{Request,Response} from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import { Redis } from "ioredis"
import "dotenv/config"

const app = express()

const corsOptions = {
  origin: process.env.CLIENT,
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors());

const redis = new Redis(process.env.REDIS_CONNECTION_STRING)
const subRedis = new Redis(process.env.REDIS_CONNECTION_STRING)

const server = http.createServer(app);
const io = new Server(server);

subRedis.on("message", (channel, message) => {
  io.to(channel).emit("room-update", message)
})

subRedis.on("error", (err) => {
  console.error("Redis subscription error", err)
})

io.on("connection",async (socket) =>{

  const { id } = socket;
  // console.log(socket.id);

  socket.on("join-room", async (room : string) =>{
    console.log("joined room : ",room)

    const subscribedRooms = await redis.smembers("subscribed-rooms")
    await socket.join(room)
    await redis.sadd(`rooms:${id}`, room)
    await redis.hincrby("room-connections", room, 1)

    if(!subscribedRooms.includes(room)){
      subRedis.subscribe(room, async (err) =>{
        if(err){
          console.error("Failed to subscribe:", err);
        }else{
          await redis.sadd("subscribed-rooms", room)
          console.log("Subscribed to room:", room)
        }
      })
    }
  })

  socket.on("disconnect", async () => {

    const { id } = socket;

    const joinedRooms = await redis.smembers(`rooms:${id}`)
    await redis.del(`rooms:${id}`)

    joinedRooms.forEach( async (room) =>{
      const remaningConnections = await redis.hincrby(`room-connections`, room , -1)

      if(remaningConnections <= 0){
        await redis.hdel(`room-connections`,room)

        subRedis.unsubscribe(room, async (err) => {
          if (err) {
            console.error("Failed to unsubscribe", err)
          } else {
            await redis.srem("subscribed-rooms", room)

            console.log("Unsubscribed from room:", room)
          }
        })
      }
    })
  })
})

const PORT = process.env.PORT || 8080
// app.use((req:Request,res:Response, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://realtime-webapp-zxif.vercel.app/");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use('/',(req:Request,res:Response)=>{
  res.json({msg:"Server is live"})
})
server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})