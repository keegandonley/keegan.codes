export const formatDate = (date?: Date) => {
  const result =
    date?.toLocaleString('en-US', {
      timeZone: 'UTC',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) ?? '';
  return result;
};

export const getMySQLDateTime = (date?: Date) => {
  const dateObject = date ?? new Date();
  return dateObject.toISOString().slice(0, 19).replace('T', ' ');
};
