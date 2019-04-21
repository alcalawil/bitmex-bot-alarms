
const calcPercent = (from, to) => {
  const result = ((to / from) - 1) * 100;
  return result;
};

module.exports = { calcPercent };