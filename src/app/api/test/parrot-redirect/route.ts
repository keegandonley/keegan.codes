import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const cookiesList = request.cookies;

  const result = Object.fromEntries(data);

  return Response.redirect(
    `https://keegan.codes/test-success?payload=${encodeURIComponent(
      JSON.stringify({
        formData: result,
        cookies: cookiesList.getAll().reduce((acc, curr) => {
          return {
            ...acc,
            [curr.name]: curr.value,
          };
        }, {}),
      })
    )},`
  );
}
