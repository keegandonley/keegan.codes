export interface Post {
  title: string;
  slug: string;
  tags?: string[];
  description: string;
  cover: string;
  published: Date;
  default: any;
  shortCodes?: string[];
  bskyThreadId?: string;
}
