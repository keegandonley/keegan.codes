import { SignedIn, UserButton } from "@clerk/nextjs";
import { get } from "@vercel/edge-config";

export const AuthDisplay = async () => {
  const flags = await get("flags");
  const displayAuth = (flags as any)?.enableAuth;

  return displayAuth ? (
    <header>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  ) : null;
};
