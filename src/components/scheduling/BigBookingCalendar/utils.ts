export const getDefaultDisplayDates = () => ({
  start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
  end: new Date(new Date().getTime() + 28 * 24 * 60 * 60 * 1000),
});
