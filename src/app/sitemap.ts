import { MetadataRoute } from "next";
import Posts from "@/posts";
import Books from "@/books";
import { readFileSync } from "fs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const published = await readFileSync("public/published.txt", "utf-8");

  return [
    {
      url: "https://keegan.codes",
      lastModified: published,
    },
    {
      url: "https://keegan.codes/resume",
      lastModified: published,
    },
    {
      url: "https://keegan.codes/blog",
      lastModified: published,
    },
    {
      url: "https://keegan.codes/pi",
      lastModified: published,
    },
    ...Object.keys(Posts).map((key) => {
      return {
        url: `https://keegan.codes/blog/${(Posts as any)[key].slug}`,
        lastModified:
          (Posts as any)[key].updated || (Posts as any)[key].published,
      };
    }),
    {
      url: "https://keegan.codes/library",
      lastModified: published,
    },
    ...Object.keys(Books).map((key) => {
      return {
        url: `https://keegan.codes/library/${(Books as any)[key].slug}`,
        lastModified:
          (Books as any)[key].updated || (Books as any)[key].published,
      };
    }),
  ];
}
