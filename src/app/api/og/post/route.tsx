/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { getComponentForKey, getKey } from "@/app/blog/util";
import { BUCKET_URL } from "@/util/r2";
import { cookies } from "next/headers";

export const runtime = "edge";

const darkBackground = "rgba(32, 65, 123, 1)";

export async function GET(request: Request) {
  const allCookies = cookies();

  const theme = allCookies.get("theme");

  const darkMode = theme?.value === "dark";

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const width = searchParams.get("width") ?? "800";
  const height = searchParams.get("height") ?? "418";

  if (!slug) {
    console.error("Missing slug at", request.url);
    return new Response("No slug provided", { status: 400 });
  }

  const key = getKey({ slug });
  if (!key) {
    console.error("Count not find the post for", slug, "at", request.url);
    return new Response("No post found", { status: 404 });
  }

  const found = getComponentForKey({ key });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={`${BUCKET_URL}/${found.cover}`}
          style={{
            minWidth: "110%",
            minHeight: "100%",
            width: "110%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            background: darkMode ? darkBackground : "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: 10,
            boxShadow: "7px 7px 17px rgba(0, 0, 0, 0.6)",
          }}
        >
          <h1
            style={{
              paddingLeft: 20,
              fontSize: 50,
              paddingBottom: 0,
              marginBottom: 0,
              color: darkMode ? "white" : darkBackground,
              width: "85%",
              paddingTop: 5,
            }}
          >
            {found.title}
          </h1>
          <p
            style={{
              paddingLeft: 20,
              fontSize: 25,
              color: darkMode ? "lightgray" : "gray",
              marginTop: 10,
              width: "85%",
              paddingBottom: 10,
            }}
          >
            {found.description}
          </p>
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              top: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginRight: 20,
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
                border: "2px solid white",
              }}
              src={`${BUCKET_URL}/avatar.jpg`}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: parseInt(width),
      height: parseInt(height),
    }
  );
}
