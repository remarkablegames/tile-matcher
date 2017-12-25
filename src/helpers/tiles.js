// https://brajeshwar.github.io/entities/
export const CLUBS = '\u2663';
export const DIAMONDS = '\u2666';
export const HEARTS = '\u2665';
export const SPADES = '\u2660';

export default [CLUBS, DIAMONDS, HEARTS, SPADES];

/**
 * Gets tile color.
 *
 * @param  {String} tile - The tile value.
 * @return {String}      - The className.
 */
export const getTileColor = tile => {
  switch (tile) {
    case SPADES:
      return 'black';
    case CLUBS:
      return 'blue';
    case HEARTS:
      return 'red';
    case DIAMONDS:
      return 'yellow';
    default:
      return '';
  }
};
