import { NextFetchEvent, NextRequest } from "next/server";
import { MiddlewareManager } from "./middleware/middlewareManager";

export async function middleware(
  request: NextRequest,
  context: NextFetchEvent
) {
  return new MiddlewareManager(request, context).execute();
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
