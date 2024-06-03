import express, { Request, Response } from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import { Redis } from "ioredis"
import "dotenv/config"
import otpRouter from "./routes/otp.route"
import { dbConfig } from "./database/db"

const corsOptions = {
  origin: ["http://localhost:3000","https://realtime-webapp.vercel.app","https://realtime-webapp-git-main-iharshyadavs-projects.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true,
}

const app = express()
app.use(express.json());
app.use(cors(corsOptions));
app.use('/otp',otpRouter);

app.get("/",(req:Request,res:Response) =>{
  res.json({
    message : "hii harsh"
  })
})

const redis = new Redis(process.env.REDIS_CONNECTION_STRING)
const subRedis = new Redis(process.env.REDIS_CONNECTION_STRING)

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","https://realtime-webapp.vercel.app" , "https://realtime-webapp-git-main-iharshyadavs-projects.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
})

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

server.listen(PORT, async () => {
  await dbConfig();
  console.log(`Server is listening on port: ${PORT}`)
})
