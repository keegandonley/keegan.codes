export async function GET(request: Request) {
  const url = new URL(request.url);
  const requestUrl = url.searchParams.get("requestUrl");

  if (!requestUrl) {
    return new Response("requestUrl is required", { status: 400 });
  }

  if (!requestUrl.startsWith("https://keegan.codes/")) {
    return new Response("requestUrl must be a keegan.codes URL", {
      status: 400,
    });
  }

  const result = await fetch(new URL(requestUrl));

  const jsonResult = await result.json();

  return Response.json(jsonResult, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
