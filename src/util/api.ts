const getBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "https://k10y.vercell.app";
};

export const fetchMetadata = async (file: string): Promise<ImageMetadata> => {
  const url = `${getBaseURL()}/api/img/metadata?id=${file}`;
  const response = await fetch(url);

  const data = await response.json();

  return data.metadata;
};
