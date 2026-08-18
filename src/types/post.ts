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

export interface CoverFilters {
  coverFilterLight?: string;
  coverFilterDark?: string;
}

export interface PostModule extends CoverFilters {
  default: any;
}

export interface Post extends PostMetadata, CoverFilters {
  default: any;
}
