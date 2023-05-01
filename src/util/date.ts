export const formatDate = (date?: Date) => {
  const result =
    date?.toLocaleString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    }) ?? "";
  console.log(date, result);
  return result;
};
