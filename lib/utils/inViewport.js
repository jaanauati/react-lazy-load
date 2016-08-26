'use strict';

var isHidden = function isHidden(element) {
  return element.offsetParent === null;
};

var offset = function offset(element) {
  var rect = element.getBoundingClientRect();

  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
};

var inViewport = function inViewport(element, container, customOffset) {
  if (isHidden(element)) {
    return false;
  }

  var top = void 0,
      left = void 0,
      bottom = void 0,
      right = void 0;

  if (typeof container === 'undefined' || container === window) {
    top = window.pageYOffset;
    left = window.pageXOffset;
    bottom = top + window.innerHeight;
    right = left + window.innerWidth;
  } else {
    var containerOffset = offset(container);

    top = containerOffset.top;
    left = containerOffset.left;
    bottom = top + container.offsetHeight;
    right = left + container.offsetWidth;
  }

  var elementOffset = offset(element);

  return top < elementOffset.top + customOffset.bottom + element.offsetHeight && bottom > elementOffset.top - customOffset.top && left < elementOffset.left + customOffset.right + element.offsetWidth && right > elementOffset.left - customOffset.left;
};

module.exports = inViewport;