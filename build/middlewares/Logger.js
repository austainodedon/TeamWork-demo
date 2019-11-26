"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// this is a debugging stractegy i used to check request from auto gradr to
// my app on heroku console.
var _default = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  const detail = {
    url: req.url,
    method: req.method
  };
  console.log(detail);
  console.log(req.body, time);
  next();
};

exports.default = _default;
//# sourceMappingURL=Logger.js.map