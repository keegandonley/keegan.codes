import { NextRequest, NextResponse } from "next/server";
import { slugs } from "../post-slugs";
import { Base404HandlingMiddleware } from "./404HandlingMiddleware";

export class BlogMiddleware extends Base404HandlingMiddleware {
  constructor(request: NextRequest, pathNameSplits: string[]) {
    super(request, pathNameSplits, slugs);
  }

  done(is404: boolean, slug?: string) {
    if (is404) {
      return NextResponse.redirect(
        `${this.origin}/not-found?slug=${slug}&type=blog`
      );
    }

    return NextResponse.next();
  }
}
