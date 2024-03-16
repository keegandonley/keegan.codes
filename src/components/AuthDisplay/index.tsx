import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import styles from "./authDisplay.module.css";
import { get } from "@vercel/edge-config";

export const AuthDisplay = async () => {
  const flags = await get("flags");
  const displayAuth = (flags as any)?.enableAuth;

  return (
    <header>
      {displayAuth ? (
        <SignedOut>
          <SignInButton />
        </SignedOut>
      ) : null}
      <SignedIn>
        <div className={styles.wrapper}>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
};
