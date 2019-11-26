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
  createArticle,
  deleteArticle,
  getArticles,
  editArticle,
  commentArticle,
  getArticle
} = _controllers.ArticleController;

const router = _express.default.Router();
/*
  @Description: endpoint users get all articles
  @Access: private authenticated users can create gif
  @Route: GET <domain>/api/v1/articles
*/


router.get('/', verifyToken, getArticles);
/*
  @Description: endpoint users get specific article
  @Access: private authenticated users can create gif
  @Route: GET <domain>/api/v1/articles/>id>
*/

router.get('/:id', verifyToken, getArticle);
/*
  @Description: endpoint users to create article
  @Access: private authenticated users can create article
  @Route: POST <domain>/api/v1/articles
*/

router.post('/', (0, _middlewares.validate)('createArticle'), verifyToken, createArticle);
/*
  @Description: endpoint users edit their article post
  @Access: private only authenticated users can edit their apost
  @Route: PATCH <domain>/api/v1/articles/<articleId>
*/

router.patch('/:id', (0, _middlewares.validate)('createArticle'), verifyToken, editArticle);
/*
  @Description: endpoint users to delete article
  @Access: private only authenticated users can deleted their  aricle
  @Route: DELETE <domain>/api/v1/articles/<:id>
*/

router.delete('/:id', verifyToken, deleteArticle);
/*
  @Description: endpoint for user to comment on an article
  @Access: private only authenticated users can comment
  @Route: POST <domain>/api/v1/articles/<:id>/comment
*/

router.post('/:id/comment', (0, _middlewares.validate)('comment'), verifyToken, commentArticle);
var _default = router;
exports.default = _default;
//# sourceMappingURL=article.js.map