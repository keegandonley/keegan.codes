import {
  S3Client,
  ListObjectsCommand,
  HeadObjectCommand,
  ListObjectsCommandInput,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3';

export const BUCKET_URL = 'https://static.donley.xyz';
export const BOOK_BUCKET_URL = 'https://library.static.donley.xyz';

export const client = new S3Client({
  region: 'us-east-1',
  endpoint: process.env.R2_WATCH_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_WATCH_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_WATCH_SECRET!,
  },
  forcePathStyle: true,
});

export const listObjects = async (
  args: ListObjectsCommandInput,
): Promise<ListObjectsV2CommandOutput['Contents']> => {
  const res = await client.send(new ListObjectsCommand(args));

  return res.Contents;
};

export const headObject = async (bucket: string, key: string) => {
  const res = await client.send(
    new HeadObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );

  return res;
};
