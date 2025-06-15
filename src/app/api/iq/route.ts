import { createIQSession } from "@/lib/iq";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const test = await createIQSession();
  return NextResponse.json(test);
}
