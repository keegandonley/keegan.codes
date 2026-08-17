'use client';

import {
  SpeedInsights as VercelSpeedInsights,
  computeRoute,
} from '@vercel/speed-insights/react';
import { useParams, usePathname } from 'next/navigation';

export function SpeedInsights() {
  const params = useParams();
  const pathname = usePathname();

  return (
    <VercelSpeedInsights
      framework="next"
      route={computeRoute(pathname, params)}
      basePath={process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH}
      configString={process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG}
    />
  );
}
