export const formatDate = (date?: Date) => {
  return (
    date?.toLocaleString("en-US", {
      timeZone: "CST",
      timeZoneName: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    }) ?? ""
  );
};
