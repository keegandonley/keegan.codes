import { NextRequest, NextResponse } from 'next/server';
import { slugs } from '../book-slugs';
import { Base404HandlingMiddleware } from './404HandlingMiddleware';

export class LibraryMiddleware extends Base404HandlingMiddleware {
  constructor(request: NextRequest, pathNameSplits: string[]) {
    super(request, pathNameSplits, slugs);
  }

  done(is404: boolean, slug?: string) {
    if (is404) {
      return NextResponse.redirect(
        `${this.origin}/routing-error?slug=${slug}&type=library`,
      );
    }

    return NextResponse.next();
  }
}
