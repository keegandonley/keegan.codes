import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// The avatar is read off disk and inlined as a data URI rather than fetched
// from R2 at render time. An OG render that has to wait on a CDN round-trip is
// exactly what the Twitterbot timeout described in ./cache.ts punishes, and
// this also keeps the photo versioned with the code instead of living behind a
// mutable bucket key.
//
// Read at module scope, since the bytes don't depend on request data. Sync
// rather than the top-level `await readFile` used for the fonts in
// ./post/route.tsx: either works (ESM propagates a nested top-level await to
// importers on its own), but a one-time blocking read of ~26KB is simpler to
// reason about in a module four routes depend on.
//
// What is NOT interchangeable is `fetch(new URL('./avatar.jpg',
// import.meta.url))`. That's a webpack asset reference which only resolves
// under the edge runtime; on Node -- which these routes use -- it throws
// ERR_INVALID_URL on every request. Same trap the Oswald fonts hit.
//
// avatar.jpg lives inside src/app/, so Next traces it into the function bundles
// without an outputFileTracingIncludes entry (contrast sitemap.ts, which reads
// from public/ and does need the include). Re-verify if its path moves -- and
// check all four bundles, since a shared module feeds each route separately:
//   for r in page post book error; do \
//     grep -o "og/avatar[^\"]*" .next/server/app/api/og/$r/route.js.nft.json; \
//   done
const avatarData = readFileSync(
  join(process.cwd(), 'src/app/api/og/avatar.jpg'),
);

const avatarBase64 = avatarData.toString('base64');

export const AVATAR_SRC = `data:image/jpeg;base64,${avatarBase64}`;
