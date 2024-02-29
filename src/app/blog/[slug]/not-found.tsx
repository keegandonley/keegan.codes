import { BlogPageProps } from "./page";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default function NotFound({ params }: BlogPageProps) {
  return redirect(`/not-found?slug=${params.slug}&type=blog`);
}
