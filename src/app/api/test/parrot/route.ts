import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let result;
  let mode;

  const host = `${
    process.env.NODE_ENV === "development" ? "http" : "https"
  }://${request.headers.get("host")}`;

  console.log(host);

  try {
    const data = await request.formData();
    result = Object.fromEntries(data);

    mode = "formData";
  } catch (ex) {
    console.log("Couldn't parse form data, trying json...");
    try {
      const data = await request.json();
      result = data;
      mode = "json";
    } catch (ex) {
      return Response.json(
        {
          error: "Couldn't parse form data or json",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": host ?? "*",
          },
        }
      );
    }
  }

  const cookiesList = cookies();

  return Response.json(
    {
      payload: result,
      cookies: cookiesList.getAll().reduce((acc, curr) => {
        return {
          ...acc,
          [curr.name]: curr.value,
        };
      }, {}),
      mode,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": host ?? "*",
      },
    }
  );
}
