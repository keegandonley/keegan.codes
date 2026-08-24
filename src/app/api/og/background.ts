import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const backgroundData = readFileSync(
  join(process.cwd(), 'src/app/api/og/background.jpg'),
);

const backgroundBase64 = backgroundData.toString('base64');

export const BACKGROUND_SRC = `data:image/jpeg;base64,${backgroundBase64}`;
