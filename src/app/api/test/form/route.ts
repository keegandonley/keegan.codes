import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const cookiesList = request.cookies;

  console.log(cookiesList);

  console.log(data.values());

  return Response.json(
    {
      message: "OK",
      redirect_url: "https://keegan.codes/test-success",
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
