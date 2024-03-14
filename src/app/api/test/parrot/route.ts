import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { connect } from "@planetscale/database";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

export async function POST(request: NextRequest) {
  let result;
  let mode;

  const origin = request.headers.get("origin");

  console.log(origin);

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
            "Access-Control-Allow-Origin": origin ?? "*",
          },
        }
      );
    }
  }

  const cookiesList = cookies();

  const conn = connect(config);

  const cookiesResult = cookiesList.getAll().reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: curr.value,
    };
  }, {});

  try {
    await conn.execute(
      "INSERT INTO parrot_requests (payload, cookies, mode, origin, created_at) VALUES (?, ?, ?, ?, ?)",
      [
        JSON.stringify(result),
        JSON.stringify(cookiesResult),
        mode,
        origin,
        new Date().toISOString().slice(0, 19).replace("T", " "),
      ]
    );
  } catch (ex) {
    console.error("Failed to insert request", ex);
  }

  return Response.json(
    {
      payload: result,
      cookies: cookiesResult,
      mode,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": origin ?? "*",
      },
    }
  );
}
