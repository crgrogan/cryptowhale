export const numberFormatter = (num) => {
  if (num > 1000000 && num < 1000000000) {
    return (num / 1000000).toFixed(2) + "M"; // convert to M for number from > 1 million
  } else if (num > 1000000000) {
    return (num / 1000000000).toFixed(2) + "B";
  } else if (num < 1000000000 && num > 1) {
    return parseFloat(num).toFixed(2);
  } else {
    return parseFloat(num);
  }
};
