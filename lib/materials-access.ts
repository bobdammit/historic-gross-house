import { cookies } from "next/headers";
import { MATERIALS_ACCESS_COOKIE } from "@/lib/documents";

export async function hasMaterialsAccess() {
  const cookieStore = await cookies();
  return cookieStore.get(MATERIALS_ACCESS_COOKIE)?.value === "granted";
}

export function materialsAccessCookieOptions(maxAge = 60 * 60 * 24) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
