export async function GET(request: Request) {
  const url = new URL(request.url);
  const requestUrl = url.searchParams.get("requestUrl");

  if (!requestUrl) {
    return new Response("requestUrl is required", {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
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

export async function POST(request: Request) {
  const url = new URL(request.url);
  const requestUrl = url.searchParams.get("requestUrl");

  if (!requestUrl) {
    return new Response("requestUrl is required", { status: 400 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    // do nothing
  }

  const result = await fetch(new URL(requestUrl), {
    method: "POST",
    body: payload ? JSON.stringify(payload) : undefined,
  });

  const jsonResult = await result.json();

  return Response.json(jsonResult, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
