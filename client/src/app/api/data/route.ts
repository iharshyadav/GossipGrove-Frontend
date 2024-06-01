import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
export async function GET (req:Request) {
    try {
        const result = await redis.smembers('subscribed-rooms');
        const res = result.slice(0,1);
        console.log("Subscribed rooms:", result);

        return NextResponse.json({
            res
        })
    } catch (err) {
        console.error("Error fetching data:", err);
    }

}