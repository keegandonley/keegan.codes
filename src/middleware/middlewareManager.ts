import { NextRequest } from "next/server";
import { ScanMiddleware } from "../scanMiddleware";
import { BlogMiddleware } from "./blogMiddleware";
import { LibraryMiddleware } from "./libraryMiddleware";

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
      case "blog":
        return new BlogMiddleware(this.request, this.pathSplits);
      case "library":
        return new LibraryMiddleware(this.request, this.pathSplits);
    }
  }

  execute() {
    const mw = this.getMiddleware();

    if (mw) {
      return mw.execute();
    } else {
      console.log(
        `Hit on middleware for ${this.url.pathname}, but no manager has been configured`
      );
    }
  }
}
