import { NextResponse, NextRequest } from 'next/server'
import { redis } from './lib/redis'
 
// This function can be marked `async` if using `await` inside
// const redis = new Redis(process.env.REDIS_CONNECTION_STRING)


export async function middleware(request: NextRequest) {

    const all = await redis.smembers("subscribed-rooms")

    const path = request.nextUrl.pathname.split("/")[2];
    // const basePath = path[2];
    console.log(path)

    const valiDateNewRoom = all.find(data => data == path)
    const url = request.nextUrl;
    const roomName = url.searchParams.get('roomName');
    console.log(roomName)

    const cookie = request.cookies.get("access-token")?.value;

    if(!cookie || roomName != path || !valiDateNewRoom){
      return NextResponse.redirect(new URL(`/`, request.url))
      // return NextResponse.redirect(new URL(`${path}`,request.url))
    }




    // const cookie = request.token
    // console.log(cookie)
    // console.log(path)

    // if(path == )

    // const findSubscribedRoom = all.find(())
    // console.log(all)
  // return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: '/privateSession/:path*',
}