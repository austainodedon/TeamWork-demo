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
  createGif,
  deleteGif,
  commentGif,
  getGif
} = _controllers.GifController;

const router = _express.default.Router();
/*
  @Description: endpoint users to create gif
  @Access: private authenticated users can create gif
  @Route: POST <domain>/api/v1/gifs
*/


router.post('/', (0, _middlewares.validate)('createGif'), verifyToken, createGif);
/*
  @Description: endpoint users get specific gif
  @Access: private authenticated users get specific gif
  @Route: GET <domain>/api/v1/gifs/>id>
*/

router.get('/:id', verifyToken, getGif);
/*
  @Description: endpoint users to delete gif
  @Access: private only authenticated users can deleted their  gif
  @Route: DELETE <domain>/api/v1/gifs/<:id>
*/

router.delete('/:id', verifyToken, deleteGif);
/*
  @Description: endpoint for user to comment on a gif
  @Access: private only authenticated users can comment
  @Route: POST <domain>/api/v1/gifs/<:id>/comment
*/

router.post('/:id/comment', (0, _middlewares.validate)('comment'), verifyToken, commentGif);
var _default = router;
exports.default = _default;
//# sourceMappingURL=gif.js.map