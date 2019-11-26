"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "renameFile", {
  enumerable: true,
  get: function () {
    return _renameFile.default;
  }
});
Object.defineProperty(exports, "errorResponse", {
  enumerable: true,
  get: function () {
    return _responses.errorResponse;
  }
});
Object.defineProperty(exports, "successResponse", {
  enumerable: true,
  get: function () {
    return _responses.successResponse;
  }
});
Object.defineProperty(exports, "successResponsArray", {
  enumerable: true,
  get: function () {
    return _responses.successResponsArray;
  }
});
exports.comparePassword = exports.hashPassword = exports.verifyToken = exports.generateToken = void 0;

var _jwt = _interopRequireDefault(require("./jwt"));

var bcrypt = _interopRequireWildcard(require("./bcrypt"));

var _renameFile = _interopRequireDefault(require("./renameFile"));

var _responses = require("./responses");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  generateToken,
  verifyToken
} = _jwt.default;
exports.verifyToken = verifyToken;
exports.generateToken = generateToken;
const {
  hashPassword,
  comparePassword
} = bcrypt;
exports.comparePassword = comparePassword;
exports.hashPassword = hashPassword;
//# sourceMappingURL=index.js.map