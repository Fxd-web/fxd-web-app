'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, options) {
  var moveFn = function moveFn(event) {
    if (isIE8) {
      fixEvent(event);
    }
    if (options.drag) {
      if (isTouch) {
        options.drag(event.touches[0]);
      } else {
        options.drag(event);
      }
    }
  };
  var upFn = function upFn(event) {
    if (isIE8) {
      fixEvent(event);
    }
    (0, _windDom.off)(document, moveEvent, moveFn);
    (0, _windDom.off)(document, endEvent, upFn);
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    if (options.end) {
      if (isTouch) {
        options.end(event.touches[0]);
      } else {
        options.end(event);
      }
    }
  };
  (0, _windDom.on)(element, startEvent, function (event) {
    if (isIE8) {
      fixEvent(event);
    }
    if (isDragging) return;
    document.onselectstart = function () {
      return false;
    };
    document.ondragstart = function () {
      return false;
    };

    (0, _windDom.on)(document, moveEvent, moveFn);
    (0, _windDom.on)(document, endEvent, upFn);
    isDragging = true;

    if (options.start) {
      if (isTouch) {
        options.start(event.touches[0]);
      } else {
        options.start(event);
      }
    }
  });
};

var _windDom = require('wind-dom');

var isDragging = false;

var isIE8 = Number(document.documentMode) < 9;

var isTouch = 'ontouchstart' in window;

var startEvent = isTouch ? 'touchstart' : 'mousedown';
var moveEvent = isTouch ? 'touchmove' : 'mousemove';
var endEvent = isTouch ? 'touchend' : 'mouseup';

var fixEvent = function fixEvent(event) {
  var scrollTop = Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0);
  var scrollLeft = Math.max(window.scrollX || 0, document.documentElement.scrollLeft || 0);

  event.target = event.srcElement;
  event.pageX = scrollLeft + event.clientX;
  event.pageY = scrollTop + event.clientY;
};