'use strict';

/**
 * Interface for G-Set CRDT
 *
 * From:
 * "A comprehensive study of Convergent and Commutative Replicated Data Types"
 * https://hal.inria.fr/inria-00555588
 */

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GSet = function () {
  function GSet() {
    (0, _classCallCheck3.default)(this, GSet);
  }

  (0, _createClass3.default)(GSet, [{
    key: 'constuctor',
    value: function constuctor(values) {}
  }, {
    key: 'append',
    value: function append(value) {}
  }, {
    key: 'merge',
    value: function merge(set) {}
  }, {
    key: 'get',
    value: function get(value) {}
  }, {
    key: 'has',
    value: function has(value) {}
  }, {
    key: 'values',
    get: function get() {}
  }, {
    key: 'length',
    get: function get() {}
  }]);
  return GSet;
}();

module.exports = GSet;