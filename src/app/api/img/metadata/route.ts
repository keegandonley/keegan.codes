import { NextResponse } from "next/server";
import imageMetadata from "../../../../image-metadata.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const fileName = searchParams.get("id");

  if (!fileName) {
    return NextResponse.error();
  }

  const decodedFileName = decodeURIComponent(fileName);

  const metadata = (imageMetadata as Record<string, ImageMetadata>)[
    decodedFileName
  ];

  return NextResponse.json({ metadata });
}
