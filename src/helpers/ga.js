window.ga('create', 'UA-59233605-5', 'auto');

// https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging
let url = 'https://www.google-analytics.com/analytics.js';
if (
  process.env.NODE_ENV === 'development' ||
  location.hostname === 'localhost'
) {
  url = 'https://www.google-analytics.com/analytics_debug.js';
  window.ga('set', 'sendHitTask', null);
}

window.ga('set', {
  title: 'Tile Matcher',
  page: '/tile-matcher/',
});
window.ga('send', 'pageview');

window.requirejs([url]);

/**
 * Tracks event with analytics.
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 *
 * @param {String} eventCategory
 * @param {String} eventAction
 * @param {String} [eventLabel]
 * @param {Number} [eventValue]
 */
export const trackEvent = (...args) => {
  window.ga.apply(null, ['send', 'event', ...args]);
};
