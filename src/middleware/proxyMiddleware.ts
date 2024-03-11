import { NextRequest, NextResponse } from "next/server";

export class ProxyMiddleware {
  private request: NextRequest;
  private headers: Record<string, string>;

  constructor(request: NextRequest) {
    this.request = request;
    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    };
  }

  private done() {
    return NextResponse.next({
      headers: this.headers,
    });
  }

  async execute() {
    const url = new URL(this.request.url);
    const requestUrl = url.searchParams.get("requestUrl");
    const token = this.request.headers.get("x-proxy-key");

    if (!token) {
      console.warn(
        "Tried to proxy url",
        requestUrl,
        "but no token was provided"
      );
      return new Response("unauthorized", {
        status: 400,
        headers: this.headers,
      });
    }

    if (token !== process.env.PROXY_KEY) {
      console.warn(
        "Tried to proxy url",
        requestUrl,
        "but the token was invalid"
      );
      return new Response("unauthorized", {
        status: 400,
        headers: this.headers,
      });
    }

    if (!requestUrl) {
      return new Response("requestUrl is required", {
        status: 400,
        headers: this.headers,
      });
    }

    if (
      !requestUrl?.startsWith("https://keegan.codes/") &&
      !requestUrl?.startsWith("http://localhost:3561/")
    ) {
      console.warn(
        "Tried to proxy url",
        requestUrl,
        "but it was not a keegan.codes URL"
      );
      return new Response("requestUrl must be a keegan.codes URL", {
        status: 400,
        headers: this.headers,
      });
    }

    console.log("Proxying request allowed to", requestUrl);

    return this.done();
  }
}
