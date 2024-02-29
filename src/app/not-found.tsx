/*
 Note: This page is using inline styles because there seems to be a nextjs
 bug that causes a FOUC when navigating to the not-found page if it uses
 CSS modules. I'll need to investigate this further but this works fine for now.
*/

import { headers } from "next/headers";
import { Graphic } from "./routing-error/graphic";
import Link from "next/link";

export const runtime = "edge";

export default function NotFound() {
  const allHeaders = headers();

  const referrer = allHeaders.get("referer");
  const referrerUrl = referrer ? new URL(referrer) : null;
  const slug =
    allHeaders.get("x-error-slug") ?? referrerUrl?.searchParams.get("slug");
  const type =
    allHeaders.get("x-error-type") ?? referrerUrl?.searchParams.get("type");

  const label =
    type === "blog" ? "blog post" : type === "library" ? "book" : "page";

  const headerStyle = {
    fontWeight: "600",
    paddingTop: "2rem",
  };

  const pStyle = {
    paddingTop: "1rem",
    opacity: "0.8",
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        color: "var(--theme-text)",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <Graphic />
        {slug ? (
          <h2 style={headerStyle}>
            On no! I couldn&apos;t find a {label} for{" "}
            <code
              style={{
                color: "var(--theme-yellow)",
              }}
            >
              {slug}
            </code>
          </h2>
        ) : (
          <h2 style={headerStyle}>
            Oh no! I couldn&apos;t find a matching resource
          </h2>
        )}
        <p style={pStyle}>
          Don&apos;t worry, we&apos;ll get through this together.
        </p>
        <p style={pStyle}>
          Please double check your URL, and if you think you&apos;re seeing this
          message in error,{" "}
          <Link
            href={`mailto:kd+brokenlink@keegandonley.com?subject=Broken link for ${label} at ${slug}`}
            style={{
              color: "var(--theme-blue-2)",
              textDecoration: "none",
            }}
          >
            please get in touch!
          </Link>
        </p>
      </div>
    </div>
  );
}
