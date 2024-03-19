import { Connection, ExecutedQuery, connect } from "@planetscale/database";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getMySQLDateTime } from "./util/date";

const psConfig = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export class ScanMiddleware {
  private db: Connection;
  private request: NextRequest;
  private pathNameSplits: string[];
  private ctx: NextFetchEvent;

  constructor(
    request: NextRequest,
    ctx: NextFetchEvent,
    pathNameSplits: string[]
  ) {
    this.db = this.getConnection();
    this.request = request;
    this.pathNameSplits = pathNameSplits;
    this.ctx = ctx;
  }

  private getConnection() {
    const conn = connect(psConfig);

    return conn;
  }

  private next() {
    return NextResponse.next();
  }

  private async getDestination(code: number) {
    const destination = await this.db.execute(
      "SELECT destination FROM scan_destinations WHERE code = ? LIMIT 1",
      [code]
    );

    return destination;
  }

  private async trackScan(code: number, url: string) {
    try {
      await this.db.execute(
        "INSERT INTO scan (code, scan_date, url, scan_dt) VALUES (?, ?, ?, ?)",
        [code, new Date(), url, getMySQLDateTime()]
      );
    } catch (ex) {
      console.error(`Could not insert scan tracking for code ${code}`, ex);
    } finally {
      return true;
    }
  }

  private getDestinationUrl(destination: ExecutedQuery<Record<string, any>>) {
    return destination?.rows?.[0]?.destination;
  }

  private success(destination: ExecutedQuery<Record<string, any>>) {
    return NextResponse.redirect(
      new URL(this.getDestinationUrl(destination), this.request.url)
    );
  }

  async execute() {
    const code = this.pathNameSplits[this.pathNameSplits.length - 1];

    if (!code) {
      console.warn(
        "No code found in request but one was expected, skipping..."
      );
      return this.next();
    }

    console.log(`Executing middleware SCAN for code ${code}`);

    try {
      const parsedCode = parseInt(code, 10);
      const destination = await this.getDestination(parsedCode);

      if (!destination?.rows?.[0]) {
        console.warn(
          `No destination exists for code ${parsedCode}, skipping...`
        );
        return this.next();
      }

      // We want to track the scan, but not block the user from being redirected
      this.ctx.waitUntil(
        this.trackScan(parsedCode, this.getDestinationUrl(destination))
      );

      return this.success(destination);
    } catch (ex) {
      console.error("Could not look up scan destination", ex);
      return this.next();
    }
  }
}
