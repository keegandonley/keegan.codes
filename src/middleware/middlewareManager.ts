import { NextFetchEvent, NextRequest } from 'next/server';
import { ScanMiddleware } from '../scanMiddleware';
import { BlogMiddleware } from './blogMiddleware';
import { LibraryMiddleware } from './libraryMiddleware';
import { NotFoundMiddleware } from './notFoundMiddleware';
import { ProxyMiddleware } from './proxyMiddleware';

export class MiddlewareManager {
  private request: NextRequest;
  private url: URL;
  private pathSplits: string[];
  private ctx: NextFetchEvent;

  constructor(req: NextRequest, ctx: NextFetchEvent) {
    this.request = req;
    this.url = new URL(req.url);
    this.pathSplits = this.url.pathname.split('/');
    this.ctx = ctx;
  }

  private getRouteFirstSegment() {
    const [, firstSegment] = this.pathSplits;

    return firstSegment;
  }

  private getRouteSecondSegment() {
    const [, , secondSegment] = this.pathSplits;

    return secondSegment;
  }

  private getMiddleware() {
    const firstSegment = this.getRouteFirstSegment();

    switch (firstSegment) {
      case 'scan':
        return new ScanMiddleware(this.request, this.ctx, this.pathSplits);
      case 'blog':
        return new BlogMiddleware(this.request, this.pathSplits);
      case 'library':
        return new LibraryMiddleware(this.request, this.pathSplits);
      case 'not-found':
      case 'routing-error':
        return new NotFoundMiddleware(this.request, this.pathSplits);
      case 'api': {
        const secondSegment = this.getRouteSecondSegment();

        switch (secondSegment) {
          case 'proxy':
            return new ProxyMiddleware(this.request);
        }
      }
    }
  }

  execute() {
    const mw = this.getMiddleware();

    if (mw) {
      return mw.execute();
    } else {
      console.log(
        `Hit on middleware for ${this.url.pathname}, but no manager has been configured`,
      );
    }
  }
}
