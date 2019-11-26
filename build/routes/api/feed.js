"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _middlewares = require("../../middlewares");

var _controllers = require("../../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  verifyToken
} = _middlewares.Authenticate;
const {
  getFeeds
} = _controllers.FeedController;

const router = _express.default.Router();
/*
  @Description: endpoint users to get feeds
  @Access: private authenticated users can get feeds
  @Route: GET <domain>/api/v1/feeds
*/


router.get('/', verifyToken, getFeeds);
var _default = router;
exports.default = _default;
//# sourceMappingURL=feed.js.map