import { NextRequest } from "next/server";
import { MiddlewareManager } from "./middleware/middlewareManager";

export async function middleware(request: NextRequest) {
  return new MiddlewareManager(request).execute();
}

export const config = {
  matcher: [
    "/scan/:id*",
    "/blog/:path*",
    "/library/:path*",
    "/not-found",
    "/routing-error",
    "/api/proxy",
  ],
};
