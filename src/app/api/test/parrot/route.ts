import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { connect } from "@planetscale/database";
import { getMySQLDateTime } from "@/util/date";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

const handleRequest = async (request: NextRequest) => {
  let result;
  let mode;

  const origin = request.headers.get("origin");

  console.log("origin was", origin);

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
            "Access-Control-Allow-Credentials": "true",
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
        getMySQLDateTime(),
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
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
};

export async function PATCH(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}
