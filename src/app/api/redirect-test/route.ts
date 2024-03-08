export async function GET() {
  return Response.json({
    message: "Hello, World!",
    redirect_url: "https://keegan.codes/test-success",
  });
}

export async function POST() {
  return Response.json({
    message: "Hello, World!",
    redirect_url: "https://keegan.codes/test-success",
  });
}
