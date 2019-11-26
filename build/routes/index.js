"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./api/user"));

var _gif = _interopRequireDefault(require("./api/gif"));

var _article = _interopRequireDefault(require("./api/article"));

var _feed = _interopRequireDefault(require("./api/feed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.use('/auth', _user.default);
router.use('/feed', _feed.default);
router.use('/gifs', _gif.default);
router.use('/articles', _article.default);
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map