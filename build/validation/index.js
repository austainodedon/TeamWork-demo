"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rules = require("./rules");

const getValidator = validationName => {
  const rules = {
    userRegister: _rules.userRegister,
    loginUser: _rules.loginUser,
    createGif: _rules.createGif,
    createArticle: _rules.createArticle,
    comment: _rules.comment
  };
  return rules[validationName];
};

var _default = getValidator;
exports.default = _default;
//# sourceMappingURL=index.js.map