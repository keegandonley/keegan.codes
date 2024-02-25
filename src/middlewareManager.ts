import { NextRequest, NextResponse } from "next/server";
import { connect } from "@planetscale/database";
import { ScanMiddleware } from "./scanMiddleware";

const psConfig = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export class MiddlewareManager {
  private request: NextRequest;
  private url: URL;
  private pathSplits: string[];

  constructor(req: NextRequest) {
    this.request = req;
    this.url = new URL(req.url);
    this.pathSplits = this.url.pathname.split("/");
  }

  private getRouteFirstSegment() {
    const [, firstSegment] = this.pathSplits;

    return firstSegment;
  }

  private getMiddleware() {
    const firstSegment = this.getRouteFirstSegment();
    switch (firstSegment) {
      case "scan":
        return new ScanMiddleware(this.request, this.pathSplits);
    }
  }

  execute() {
    const Middleware = this.getMiddleware();

    if (Middleware) {
      return Middleware.execute();
    } else {
      console.log(
        `Hit on middleware for ${this.url.pathname}, but no manager has been configured`
      );
    }
  }
}
