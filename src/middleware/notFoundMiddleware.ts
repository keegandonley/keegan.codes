import { NextRequest, NextResponse } from "next/server";

export class NotFoundMiddleware {
  protected pathNameSplits: string[];
  protected request: NextRequest;

  constructor(request: NextRequest, pathNameSplits: string[]) {
    this.request = request;
    this.pathNameSplits = pathNameSplits;
  }

  done() {
    return NextResponse.next({
      status: 404,
    });
  }

  execute() {
    return this.done();
  }
}
