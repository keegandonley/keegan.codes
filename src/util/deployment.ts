export const getFullyQualifiedDeploymentUrl = (path: `/${string}`) => {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || "3561";
    return `http://localhost:${port}${path}`;
  }

  const url =
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL ||
    "keegan.codes";

  return `https://${url}${path}`;
};

export const getUrlFromHost = (host: string | null, path?: `/${string}`) => {
  if (host?.includes("localhost")) {
    return `http://${host}${path}`;
  }

  return `https://${host}${path}`;
};

export const getCookieDomain = () => {
  return process.env.NODE_ENV === "development" ? "localhost" : "keegan.codes";
};
