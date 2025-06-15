import { auth } from "@/lib/auth";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

// Initialize Redis
const redis = Redis.fromEnv();

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { userId } = body;

  //   const session = await auth.api.getSession({
  //     headers: req.headers,
  //   });

  //   if (!session) {
  //     return new Response("Authenticate required", {
  //       status: 403,
  //       statusText: "Forbidden",
  //     });
  //   }

  // Fetch data from Redis
  const result = await redis.get(`@upstash/ratelimit::${userId}:20253`);

  // Return the result in the response
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
};
