import { NextRequest, NextResponse } from 'next/server';

export class NotFoundMiddleware {
  protected pathNameSplits: string[];
  protected request: NextRequest;

  constructor(request: NextRequest, pathNameSplits: string[]) {
    this.request = request;
    this.pathNameSplits = pathNameSplits;
  }

  done() {
    const url = new URL(this.request.url);
    const slug = url.searchParams.get('slug');
    const type = url.searchParams.get('type') || 'generic';

    const headers = new Headers(this.request.headers);
    if (slug) {
      headers.set('x-error-slug', slug);
    }

    headers.set('x-error-type', type);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  execute() {
    return this.done();
  }
}
