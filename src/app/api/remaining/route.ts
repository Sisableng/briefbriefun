import { useRateLimit } from "@/hooks/useRateLimit";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return new Response("Authenticate required", {
      status: 403,
      statusText: "Forbidden",
    });
  }

  const { ratelimit } = useRateLimit();

  const { remaining } = await ratelimit.getRemaining(session?.user.id);

  return NextResponse.json({
    remaining,
  });
}
