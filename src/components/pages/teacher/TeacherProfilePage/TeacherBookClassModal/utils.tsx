export const getFormattedPrice = (price: number) => {
  return `$${(price / 100).toFixed(2)}`;
};
