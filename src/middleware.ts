import { MiddlewareManager } from "./middleware/middlewareManager";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/account(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  return new MiddlewareManager(req, auth).execute();
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // no static files
    "/",
    "/(api|trpc)(.*)",
  ],
};
