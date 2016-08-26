'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCallback = registerCallback;
exports.unregisterCallback = unregisterCallback;

var _observer = null;

var _callbacks = [];
var _observerConfig = { childList: true, subtree: true };

function _executeCallbacks() {
  _callbacks.forEach(function (cb) {
    try {
      cb();
    } catch (ex) {} // eslint-disable-line no-empty
  });
}
/**
 * If browser supports the feature, create a unique observer that listens
 * for DOM changes, and executes the registered callbacks (_callbacks).
 */
if (typeof MutationObserver !== 'undefined') {
  _observer = new MutationObserver(_executeCallbacks);
  _observer.observe(document.body, _observerConfig);
} else {
  // IE10 and IE9 fallback
  document.body.addEventListener('DOMSubtreeModified', _executeCallbacks);
}

function registerCallback(cb) {
  if (_callbacks.indexOf(cb) !== -1) {
    _callbacks.push(cb);
  }
}

function unregisterCallback(cb) {
  var idx = _callbacks.indexOf(cb);
  if (idx !== -1) {
    _callbacks.splice(idx, 1);
  }
}