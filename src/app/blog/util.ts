import Posts from "@/posts";

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

export const getComponentForKey = ({ key }: GetComponentArg) => {
  return (Posts as any)[key];
};
