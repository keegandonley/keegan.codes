import { NextRequest } from "next/server";
import { MiddlewareManager } from "./middleware/middlewareManager";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  return new MiddlewareManager(req, auth).execute();
});

export const config = {
  // matcher: [
  //   "/scan/:id*",
  //   "/blog/:path*",
  //   "/library/:path*",
  //   "/not-found",
  //   "/routing-error",
  //   "/api/proxy",
  // ],
};
