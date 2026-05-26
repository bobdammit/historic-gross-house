import { NextResponse } from "next/server";
import { hasMaterialsAccess } from "@/lib/materials-access";

export async function GET() {
  const unlocked = await hasMaterialsAccess();
  return NextResponse.json({ unlocked });
}
