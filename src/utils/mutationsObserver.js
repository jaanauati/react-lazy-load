
let _observer = null;

const _callbacks = [];
const _observerConfig = { childList: true, subtree: true };

/**
 * If browser supports the feature, create a unique observer that listens
 * for DOM changes, and executes the registered callbacks (_callbacks).
 */
if (typeof MutationObserver !== 'undefined') {
  _observer = new MutationObserver(function observerCallback() {
    _callbacks.forEach((cb) => {
      try {
        cb();
      } catch (ex) { } // eslint-disable-line no-empty
    });
  });
  _observer.observe(document.body, _observerConfig);
}

export function registerCallback(cb) {
  if (_callbacks.indexOf(cb) !== -1) {
    _callbacks.push(cb);
  }
}

export function unregisterCallback(cb) {
  const idx = _callbacks.indexOf(cb);
  if (idx !== -1) {
    _callbacks.splice(idx, 1);
  }
}
