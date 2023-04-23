import { NextResponse } from "next/server";
import barcelonaGallery from "../../../galleries/barcelona/gallery";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const gallery = searchParams.get("gallery");

  if (gallery === "barcelona") {
    return NextResponse.json({
      gallery: barcelonaGallery,
      bucket: "https://barcelona.gallery.static.donley.xyz",
    });
  }

  return NextResponse.error();
}
