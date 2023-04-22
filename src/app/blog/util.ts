import Posts from "@/posts";
import { Post } from "@/types/post";

interface GetKeyArg {
  slug: string;
}

export const getKey = ({ slug }: GetKeyArg) => {
  return Object.keys(Posts).find((key) => {
    const component = (Posts as any)[key];
    return component.slug === slug;
  });
};

interface GetComponentArg {
  key: string;
}

export const getComponentForKey = ({ key }: GetComponentArg): Post => {
  return (Posts as any)[key];
};
