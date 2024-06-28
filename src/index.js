import { h, render } from 'preact';
import Game from './Game';
import './index.css';

/**
 * Initializes app.
 */
const bootstrap = () => {
  // initialize google analytics and render game
  require('./helpers/ga');
  render(<Game />, document.getElementById('root'));
};

/**
 * Try to load polyfill before app.
 */
if (process.env.NODE_ENV === 'development') {
  bootstrap();
} else {
  window.requirejs(
    bootstrap,
    bootstrap // http://requirejs.org/docs/api.html#errbacks
  );
}
