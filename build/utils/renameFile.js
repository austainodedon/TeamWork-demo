"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = filename => {
  const uniqueName = (0, _v.default)().split('-')[0];
  const mimeType = filename.slice(filename.lastIndexOf('.') + 1);
  return `image_${uniqueName}.${mimeType}`;
};

exports.default = _default;
//# sourceMappingURL=renameFile.js.map