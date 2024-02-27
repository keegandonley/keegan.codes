export async function POST(request: Request) {
  const res: unknown = await request.json();

  console.log("got vercel webhook", res);

  return new Response("Success!", { status: 200 });
}
