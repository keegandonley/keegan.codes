import { Connection, ExecutedQuery, connect } from "@planetscale/database";
import { NextRequest, NextResponse } from "next/server";

const psConfig = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export class ScanMiddleware {
  private db: Connection;
  private request: NextRequest;
  private pathNameSplits: string[];

  constructor(request: NextRequest, pathNameSplits: string[]) {
    this.db = this.getConnection();
    this.request = request;
    this.pathNameSplits = pathNameSplits;
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

  private trackScan(code: number) {
    return this.db.execute("INSERT INTO scan (code, scan_date) VALUES (?, ?)", [
      code,
      new Date(),
    ]);
  }

  private success(destination: ExecutedQuery<Record<string, any>>) {
    return NextResponse.redirect(
      new URL(destination?.rows?.[0]?.destination, this.request.url)
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

      // If there is an error tracking the scan, we still want it to succeed
      // on the redirect
      try {
        await this.trackScan(parsedCode);
      } catch (ex) {
        console.error(
          `Could not insert scan tracking for code ${parsedCode}`,
          ex
        );
        return this.next();
      }

      return this.success(destination);
    } catch (ex) {
      console.error("Could not look up scan destination", ex);
    }
  }
}
