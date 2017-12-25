import { h, Component } from 'preact';
import TileMatcher from '../TileMatcher';
import tiles from '../helpers/tiles';
import './style.css';

export default class Game extends Component {
  render() {
    return (
      <div className="center">
        <h1 className="heading text-center">Tile Matcher</h1>
        <TileMatcher tiles={tiles} rowSize={5} columnSize={5} />
      </div>
    );
  }
}
