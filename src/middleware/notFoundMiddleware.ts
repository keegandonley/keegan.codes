import { NextRequest, NextResponse } from "next/server";

export class NotFoundMiddleware {
  protected pathNameSplits: string[];
  protected request: NextRequest;

  constructor(request: NextRequest, pathNameSplits: string[]) {
    this.request = request;
    this.pathNameSplits = pathNameSplits;
  }

  done() {
    const url = new URL(this.request.url);
    const slug = url.searchParams.get("slug");
    const type = url.searchParams.get("type");

    const headers = new Headers(this.request.headers);
    if (slug) {
      headers.set("x-error-slug", slug);
    }
    if (type) {
      headers.set("x-error-type", type);
    }

    console.log("added header slug", slug);
    console.log("added header type", type);

    return NextResponse.next({
      headers,
    });
  }

  execute() {
    return this.done();
  }
}