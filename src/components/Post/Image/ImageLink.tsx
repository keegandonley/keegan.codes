"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface ImageLinkProps {
  img: string;
  children: any;
}
export const ImageLink = ({ children, img }: ImageLinkProps) => {
  const { slug } = useParams();
  const router = useRouter();

  return <Link href={`/blog/image/${img}/${slug}`}>{children}</Link>;
};
