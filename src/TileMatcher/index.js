import { h, Component } from 'preact';
import { clone, mapColToRow, random } from '../helpers/utils';
import { getTileColor } from '../helpers/tiles';
import { trackEvent } from '../helpers/ga';
import './style.css';

export default class TilePuzzle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: this.generateTiles(),
      clicks: 0,
      isSolved: false,
    };
  }

  /**
   * Generates two-dimensional tile array.
   *
   * @return {Array}
   */
  generateTiles = () => {
    const { tiles, rowSize, columnSize } = this.props;
    const rows = [];
    const tilesCount = tiles.length;
    for (let r = 0; r < rowSize; r++) {
      const columns = [];
      for (let c = 0; c < columnSize; c++) {
        const randomTile = tiles[random(tilesCount)];
        columns.push(randomTile);
      }
      rows.push(columns);
    }
    return rows;
  };

  /**
   * Removes tile item and then checks left, right, top, and bottom.
   *
   * @param  {Array}  array - The tile array to be mutated.
   * @param  {*}      item  - The tile item value.
   * @param  {Number} row   - The tile row index position.
   * @param  {Number} col   - The tile column index position.
   * @return {Array}
   */
  removeItem(array, item, row, col) {
    if (array[row][col] === undefined) return;
    array[row][col] = undefined;
    // left
    if (array[row][col - 1] === item) {
      this.removeItem(array, item, row, col - 1);
    }
    // right
    if (array[row][col + 1] === item) {
      this.removeItem(array, item, row, col + 1);
    }
    // top
    if (array[row - 1] && array[row - 1][col] === item) {
      this.removeItem(array, item, row - 1, col);
    }
    // bottom
    if (array[row + 1] && array[row + 1][col] === item) {
      this.removeItem(array, item, row + 1, col);
    }
    return array;
  }

  /**
   * Redraws tiles (moves them down if empty).
   *
   * @param {Array} array - The tile array to be mutated.
   */
  redrawTiles(array) {
    const mappedArray = mapColToRow(array);
    mappedArray.forEach(items => {
      // move undefined to beginning
      items.forEach((item, index) => {
        if (item === undefined) {
          items.splice(index, 1);
          items.unshift(undefined);
        }
      });
    });
    return mapColToRow(mappedArray);
  }

  /**
   * Handles the click of a tile item and then updates the state of tiles.
   *
   * @param  {*}      item  - The tile item value.
   * @param  {Number} row   - The tile row index position.
   * @param  {Number} col   - The tile column index position.
   */
  clickItem = (item, row, col) => {
    const { rowSize, columnSize } = this.props;

    // skip if tile is empty
    if (item === undefined) return;

    // increment total clicks
    let { clicks } = this.state;
    clicks += 1;

    trackEvent('tile', 'click', 'Tile Matcher', clicks);

    // remove tile
    const clonedTiles = clone(this.state.tiles);
    this.removeItem(clonedTiles, item, row, col);

    // check if puzzle is solved
    const isSolved = clonedTiles.join('').length === rowSize * (columnSize - 1);
    if (isSolved) {
      trackEvent('tile', 'solved', 'Tile Matcher', clicks);
    }

    // redraw tiles
    this.setState(state => {
      return {
        tiles: this.redrawTiles(clonedTiles),
        clicks,
        isSolved,
      };
    });
  };

  /**
   * Restarts tile puzzle.
   */
  restart = () => {
    trackEvent('tile', 'restart', 'Tile Matcher', this.state.clicks);
    this.setState({
      tiles: this.generateTiles(),
      clicks: 0,
      isSolved: false,
    });
  };

  render() {
    const { tiles, clicks, isSolved } = this.state;
    return (
      <div>
        <table>
          <tbody>
            {tiles.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((item, itemIndex) => (
                  <td key={itemIndex}>
                    <button
                      className={getTileColor(item)}
                      onClick={this.clickItem.bind(
                        this,
                        item,
                        rowIndex,
                        itemIndex
                      )}
                    >
                      {item}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          <span>Clicks: {clicks}</span>
          {isSolved && (
            <button className="float-right" onClick={this.restart}>
              Restart
            </button>
          )}
        </p>
        <br />
      </div>
    );
  }
}
