import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareManager } from './middleware/middlewareManager';

export async function proxy(
  request: NextRequest,
  context: NextFetchEvent,
) {
  return new MiddlewareManager(request, context).execute();
}

export const config = {
  matcher: ['/scan/:id*', '/api/proxy'],
};
