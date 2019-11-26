"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

var _User = _interopRequireDefault(require("./models/User"));

var _Gif = _interopRequireDefault(require("./models/Gif"));

var _Article = _interopRequireDefault(require("./models/Article"));

var _Comment = _interopRequireDefault(require("./models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async () => {
  try {
    // check db for response
    await _index.default.query('SELECT NOW()'); // create tables

    await _index.default.query(_User.default);
    await _index.default.query(_Gif.default);
    await _index.default.query(_Article.default);
    await _index.default.query(_Comment.default);

    if (process.env.NODE_ENV !== 'production') {
      console.log('Database connected with tables');
    }

    return true;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error.message);
    }

    return false;
  }
};

exports.default = _default;
//# sourceMappingURL=initDb.js.map