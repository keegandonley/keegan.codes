export interface Book {
  title: string;
  slug: string;
  author: string;
  tags?: string[];
  description: string;
  cover: string;
  published: Date;
  readDate: Date;
  shortCodes?: string[];
  medium: string;
  isbn: string;
  goodreads: string;
  rating: number;
  default: any;
  headerImage?: string;
}
