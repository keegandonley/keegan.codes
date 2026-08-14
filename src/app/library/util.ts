import Books from '@/books';
import { Book } from '@/types/book';

export const getAllBooks = (): Book[] =>
  Object.keys(Books).map((key) => (Books as any)[key] as Book);

export const getSlugParams = () => getAllBooks().map(({ slug }) => ({ slug }));

interface GetKeyArg {
  slug: string;
}

export const getKey = ({ slug }: GetKeyArg) => {
  return Object.keys(Books).find((key) => {
    const component = (Books as any)[key];
    return component.slug === slug;
  });
};

interface GetComponentArg {
  key: string;
}

export const getComponentForKey = ({ key }: GetComponentArg): Book => {
  return (Books as any)[key];
};
