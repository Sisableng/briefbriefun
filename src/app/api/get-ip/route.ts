import { NextRequest } from "next/server";

export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");

  const res = await fetch("https://ipinfo.io/json");
  const locationData = await res.json();

  return Response.json({
    locationData,
    ip,
    headers: req.headers.keys(),
    cookies: req.cookies.getAll(),
  });
}
