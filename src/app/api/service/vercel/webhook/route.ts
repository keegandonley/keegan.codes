import crypto from "crypto";
import { connect } from "@planetscale/database";

const config = {
  host: process.env.host,
  username: process.env.username,
  password: process.env.password,
};

const sha1 = (data: Buffer, secret: string): string => {
  return crypto.createHmac("sha1", secret).update(data).digest("hex");
};

export async function POST(request: Request) {
  const { DEPLYMENT_WEBHOOK_TOKEN } = process.env;

  if (typeof DEPLYMENT_WEBHOOK_TOKEN != "string") {
    throw new Error("No deployment webhook secret found");
  }

  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, "utf-8");
  const bodySignature = sha1(rawBodyBuffer, DEPLYMENT_WEBHOOK_TOKEN);

  if (bodySignature !== request.headers.get("x-vercel-signature")) {
    return Response.json({
      code: "invalid_signature",
      error: "signature didn't match",
    });
  }

  const json = JSON.parse(rawBodyBuffer.toString("utf-8"));
  const conn = connect(config);

  switch (json.type) {
    case "deployment.succeeded": {
      await conn.execute(
        "INSERT INTO vercel_deployment (vercel_id, deployment_id, deployment_url, inspect_url, created_at, target) VALUES (?, ?, ?, ?, ?, ?)",
        [
          json.id,
          json.payload.deployment.id,
          json.payload.deployment.url,
          json.payload.deployment.inspectorUrl,
          new Date(json.createdAt).toISOString().slice(0, 19).replace("T", " "),
          json.payload.target,
        ]
      );
      console.log(
        "Deployment",
        json.payload.deployment.id,
        "logged successfully"
      );
    }
  }

  return new Response("Success!", { status: 200 });
}
