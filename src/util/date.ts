export const formatDate = (date?: Date) => {
  date?.setHours(12);
  const result =
    date?.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      month: "long",
      day: "numeric",
      year: "numeric",
    }) ?? "";
  console.log(date, result);
  return result;
};
