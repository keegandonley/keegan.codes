import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { ClerkMiddlewareAuth } from "@clerk/nextjs/dist/types/server";

export class AccountMiddleware {
  protected auth: ClerkMiddlewareAuth;
  protected request: NextRequest;

  constructor(request: NextRequest, auth: ClerkMiddlewareAuth) {
    this.request = request;
    this.auth = auth;
  }

  done(userId: string | null) {
    const headers = new Headers(this.request.headers);

    if (userId) {
      headers.set("x-user-id", userId);
    }

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  execute() {
    console.log(this.auth());
    return this.done(this.auth().userId);
  }
}
