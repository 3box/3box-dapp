'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LamportClock = function () {
  function LamportClock(id, time) {
    (0, _classCallCheck3.default)(this, LamportClock);

    this.id = id;
    this.time = time || 0;
  }

  (0, _createClass3.default)(LamportClock, [{
    key: 'tick',
    value: function tick() {
      return new LamportClock(this.id, ++this.time);
    }
  }, {
    key: 'merge',
    value: function merge(clock) {
      this.time = Math.max(this.time, clock.time);
      return new LamportClock(this.id, this.time);
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new LamportClock(this.id, this.time);
    }
  }], [{
    key: 'compare',
    value: function compare(a, b) {
      // Calculate the "distance" based on the clock, ie. lower or greater
      var dist = a.time - b.time;

      // If the sequence number is the same (concurrent events),
      // and the IDs are different, take the one with a "lower" id
      if (dist === 0 && a.id !== b.id) return a.id < b.id ? -1 : 1;

      return dist;
    }
  }]);
  return LamportClock;
}();

module.exports = LamportClock;