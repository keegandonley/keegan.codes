export const getFullyQualifiedDeploymentUrl = async (path: `/${string}`) => {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || "3561";
    return { url: `http://localhost:${port}${path}` };
  }

  let host = null;

  if (typeof window !== "undefined") {
    const getHeaders = (await import("next/headers")).headers;
    const headersList = getHeaders();
    host = headersList.get("host") || "keegan.codes";
  }

  return { url: host ? getUrlFromHost(host, path) : path };
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
