export async function GET(request: Request) {
  const text = await request.text();

  console.log(text);

  return new Response("ok", { status: 200 });
}
