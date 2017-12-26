const initApp = () => {
  // initialize google analytics
  require('./helpers/ga');

  // render game
  const { h, render } = require('preact');
  const Game = require('./Game').default;
  require('./index.css');

  render(<Game />, document.getElementById('container'));
};

// try to load polyfill before app
window.requirejs(
  ['https://cdn.polyfill.io/v2/polyfill.min.js?features=es5&flags=gated'],
  initApp,
  initApp // http://requirejs.org/docs/api.html#errbacks
);
