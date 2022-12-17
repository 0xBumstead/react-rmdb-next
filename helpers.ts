// Convert time to hours and minutes
export const calcTime = (time: number): string => {
  const hours: number = Math.floor(time / 60);
  const mins: number = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = (money: number): string => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(money);
};
// Convert a date string into a nice format
export const formatDate = (dateStr: string, region: string): string => {
  const date = new Date(dateStr)
  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(region)
  return formatter.format(date)
}