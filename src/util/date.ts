export const formatDate = (date?: Date) => {
  date?.setHours(12);
  return (
    date?.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      month: "long",
      day: "numeric",
      year: "numeric",
    }) ?? ""
  );
};
