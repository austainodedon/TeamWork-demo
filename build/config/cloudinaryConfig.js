"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cloudinary.default.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var _default = _cloudinary.default;
exports.default = _default;
//# sourceMappingURL=cloudinaryConfig.js.map