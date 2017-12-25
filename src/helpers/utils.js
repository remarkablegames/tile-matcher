/**
 * Clones an array of depth 2.
 *
 * @param  {Array} array
 * @return {Array}
 */
export const clone = array => array.map(item => item.slice());

/**
 * Maps column to row for two-dimensional array.
 *
 * @param  {Array} array
 * @return {Array}
 */
export const mapColToRow = array => {
  const result = [];
  array.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      result[colIndex] = result[colIndex] || [];
      result[colIndex][rowIndex] = item;
    });
  });
  return result;
};

/**
 * Generates a random number between zero and max (exclusive).
 *
 * @param  {Number} max
 * @return {Number}
 */
export const random = max => Math.floor(Math.random() * max);

export default {
  clone,
  mapColToRow,
  random,
};
