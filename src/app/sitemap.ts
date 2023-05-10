import { MetadataRoute } from "next";
import Posts from "@/posts";
import Books from "@/books";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://keegan.codes",
      lastModified: new Date(),
    },
    {
      url: "https://keegan.codes/resume",
      lastModified: new Date(),
    },
    {
      url: "https://keegan.codes/blog",
      lastModified: new Date(),
    },
    ...Object.keys(Posts).map((key) => {
      return {
        url: `https://keegan.codes/blog/${(Posts as any)[key].slug}`,
        lastModified: new Date(),
      };
    }),
    {
      url: "https://keegan.codes/library",
      lastModified: new Date(),
    },
    ...Object.keys(Books).map((key) => {
      return {
        url: `https://keegan.codes/library/${(Books as any)[key].slug}`,
        lastModified: new Date(),
      };
    }),
  ];
}
