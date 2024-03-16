import { NextRequest, NextResponse } from "next/server";
import { ScanMiddleware } from "../scanMiddleware";
import { BlogMiddleware } from "./blogMiddleware";
import { LibraryMiddleware } from "./libraryMiddleware";
import { NotFoundMiddleware } from "./notFoundMiddleware";
import { ProxyMiddleware } from "./proxyMiddleware";
import { AccountMiddleware } from "./accountMiddleware";
import { ClerkMiddlewareAuth } from "@clerk/nextjs/dist/types/server";

export class MiddlewareManager {
  private request: NextRequest;
  private url: URL;
  private pathSplits: string[];
  private auth: ClerkMiddlewareAuth;

  constructor(req: NextRequest, auth: ClerkMiddlewareAuth) {
    this.request = req;
    this.url = new URL(req.url);
    this.pathSplits = this.url.pathname.split("/");
    this.auth = auth;
  }

  private getRouteFirstSegment() {
    const [, firstSegment] = this.pathSplits;

    return firstSegment;
  }

  private getRouteSecondSegment() {
    const [, , secondSegment] = this.pathSplits;

    return secondSegment;
  }

  private getMiddleware() {
    const firstSegment = this.getRouteFirstSegment();

    switch (firstSegment) {
      case "scan":
        return new ScanMiddleware(this.request, this.pathSplits);
      case "blog":
        return new BlogMiddleware(this.request, this.pathSplits);
      case "library":
        return new LibraryMiddleware(this.request, this.pathSplits);
      case "not-found":
      case "routing-error":
        return new NotFoundMiddleware(this.request, this.pathSplits);
      case "api": {
        const secondSegment = this.getRouteSecondSegment();

        switch (secondSegment) {
          case "proxy":
            return new ProxyMiddleware(this.request);
        }
      }
      case "account": {
        return new AccountMiddleware(this.request, this.auth);
      }
    }
  }

  execute() {
    const mw = this.getMiddleware();

    if (mw) {
      return mw.execute();
    } else {
      console.log("skipping middleware for", this.url.pathname);
      return NextResponse.next();
    }
  }
}
