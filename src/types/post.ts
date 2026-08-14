export interface PostMetadata {
  title: string;
  slug: string;
  tags?: string[];
  description: string;
  cover: string;
  published: Date;
  shortCodes?: string[];
  bskyThreadId?: string;
  updated?: Date;
}

export interface PostModule {
  default: any;
}

export interface Post extends PostMetadata {
  default: any;
}
