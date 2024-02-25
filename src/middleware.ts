import { NextRequest } from "next/server";
import { MiddlewareManager } from "./middlewareManager";

export async function middleware(request: NextRequest) {
  console.log("middleware executing on", request.url);
  return new MiddlewareManager(request).execute();
}

export const config = {
  matcher: ["/scan/:id*" /*,"/api/:path*"*/],
};
