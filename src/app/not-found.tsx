import { redirect } from "next/navigation";

export const runtime = "edge";

export default function NotFound() {
  return redirect("/not-found");
}
