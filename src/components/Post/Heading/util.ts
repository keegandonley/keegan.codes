export const getId = (text: any) => {
  if (typeof text === "string") {
    // only keep alphanumercis
    return text.toLowerCase().replace(/[^a-z0-9]/g, "");
  }
};
