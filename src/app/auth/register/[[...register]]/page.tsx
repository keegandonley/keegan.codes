import { SignUp } from "@clerk/nextjs";
import styles from "./register.module.css";
import { get } from "@vercel/edge-config";
import { redirect } from "next/navigation";

export default async function Page() {
  const flags = await get("flags");

  if (!(flags as any)?.enableAuth) {
    return redirect("/");
  }

  return (
    <div className={styles.wrapper}>
      <SignUp />
    </div>
  );
}
