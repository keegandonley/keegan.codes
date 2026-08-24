import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const avatarData = readFileSync(
  join(process.cwd(), 'src/app/api/og/avatar.jpg'),
);

const avatarBase64 = avatarData.toString('base64');

export const AVATAR_SRC = `data:image/jpeg;base64,${avatarBase64}`;
