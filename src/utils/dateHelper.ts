const formateToSQLDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const startOfWeek = (date: Date): Date => {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  return new Date(date.setDate(diff));
};

const startAndEndOfWeek = (date: Date): Date[] => {


  // If no date object supplied, use current date
  // Copy date so don't modify supplied date
  const now = date ? new Date(date) : new Date();

  // set time to some convenient value
  now.setHours(0, 0, 0, 0);

  // Get the previous Monday
  const monday = new Date(now);
  monday.setDate(monday.getDate() - monday.getDay() + 1);

  // Get next Sunday
  const sunday = new Date(now);
  sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

  // Return array of date objects
  return [monday, sunday];
};

const formatDateToMonthAndDay = (date: Date): string => {
  return date.toLocaleDateString('default', { month: 'long' }) + ' ' + date.toLocaleString('default', { day: '2-digit' });
};

const currentWeek = (d: Date): number => {
  //find the year of the current date
  const oneJan = new Date(d.getFullYear(), 0, 1);

  // calculating number of days in given year before a given date   
  const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));

  // adding 1 since to current date and returns value starting from 0   
  const result = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);

  return result;
};


export { startOfWeek, formateToSQLDate, currentWeek, startAndEndOfWeek, formatDateToMonthAndDay };