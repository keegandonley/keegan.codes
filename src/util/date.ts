export const formatDate = (date?: Date) => {
  return (
    date?.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      month: "long",
      day: "numeric",
      year: "numeric",
    }) ?? ""
  );
};
