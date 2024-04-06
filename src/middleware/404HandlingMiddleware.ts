import { NextRequest, NextResponse } from 'next/server';

export abstract class Base404HandlingMiddleware {
  protected pathNameSplits: string[];
  protected origin: string;
  protected slugs: string[];

  constructor(request: NextRequest, pathNameSplits: string[], slugs: string[]) {
    this.pathNameSplits = pathNameSplits;
    const url = new URL(request.url);
    this.origin = url.origin;
    this.slugs = slugs;
  }

  protected abstract done(is404: boolean, slug?: string): NextResponse;

  public execute() {
    // Just /[path], no slug
    if (this.pathNameSplits.length <= 2) {
      return this.done(false);
    }

    const slug = this.pathNameSplits[2];

    if (slug === 'tag') {
      return this.done(false);
    }

    if (this.slugs.includes(slug)) {
      return this.done(false);
    }

    return this.done(true, slug);
  }
}
