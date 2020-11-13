export const formatDate = (date) => {
  const parsedDate = new Date(date);
  let month = "" + (parsedDate.getMonth() + 1);
  let day = "" + parsedDate.getDate();
  const year = parsedDate.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
