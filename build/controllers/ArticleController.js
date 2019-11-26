"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _services = require("../services");

var _helper = require("../database/query/helper");

/**
 * @class ArticleController
 * @description Controller to manage article CRUD
 * @exports ArticleController
 */
class ArticleController {
  /**
   * @method getArticles
   * @description - method to get all articles
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */
  static async getArticles(req, res) {
    try {
      const {
        error,
        result: articles
      } = await (0, _helper.getItems)('articles');

      if (!error) {
        return (0, _utils.successResponsArray)(res, 200, articles);
      }

      return (0, _utils.errorResponse)(res, 500, 'Server error geting items');
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'Server error');
    }
  }
  /**
  * @method getArticle
  * @description - method to get all articles
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} request response body
  */


  static async getArticle(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        error,
        result: article
      } = await (0, _helper.getItem)('articles', {
        id
      });
      const {
        result: commentArr
      } = await (0, _helper.getItems)('comments', {
        postId: id
      });

      if (!error) {
        const response = { ...article,
          comments: commentArr
        };
        return (0, _utils.successResponse)(res, 200, 'Articles', response);
      }

      return (0, _utils.errorResponse)(res, 500, 'Server error geting items');
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'Server error');
    }
  }
  /**
   * @method createArticle
   * @description - method for users to create article
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */


  static async createArticle(req, res) {
    const {
      title,
      article,
      share
    } = req.body;
    const {
      userId: ownerId,
      firstName,
      lastName
    } = req.user;
    let imgUrl;

    if (req.files && req.files.image) {
      const {
        image
      } = req.files;
      const {
        secure_url: secureUrl
      } = await (0, _services.uploadCloudinary)(image);
      imgUrl = secureUrl;
    }

    try {
      const {
        error,
        result: newArticle
      } = await (0, _helper.createItem)('articles', {
        title,
        ownerId,
        share: share === 'false' ? share : true,
        coverImageUrl: imgUrl || 'none',
        article,
        authorName: `${firstName} ${lastName}`
      });

      if (!error) {
        return (0, _utils.successResponse)(res, 201, 'Article created successfuly', newArticle);
      }

      throw new Error('Server error');
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'Internal server error');
    }
  }
  /**
  * @method editArticle
  * @description - method for users to edit their article
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} request response body
  */


  static async editArticle(req, res) {
    const {
      title,
      article,
      share
    } = req.body;
    const {
      id: articleId
    } = req.params;
    const {
      userId: ownerId,
      firstName,
      lastName
    } = req.user;

    try {
      const {
        result: existingArticle
      } = await (0, _helper.getItem)('articles', {
        id: articleId
      });
      if (!existingArticle) return (0, _utils.errorResponse)(res, 404, 'Not found');

      if (existingArticle.ownerId !== ownerId) {
        return (0, _utils.errorResponse)(res, 403, 'Request not allowed');
      }

      let imgUrl;

      if (req.files && req.files.image) {
        const {
          image
        } = req.files;
        const {
          secure_url: secureUrl
        } = await (0, _services.uploadCloudinary)(image);
        imgUrl = secureUrl;
      }

      const {
        error,
        result: newArticle
      } = await (0, _helper.updateItem)('articles', articleId, {
        title: title || existingArticle.title,
        ownerId,
        share: share === 'false' ? share : true,
        coverImageUrl: imgUrl || existingArticle.coverImageUrl,
        article: article || existingArticle.article,
        authorName: `${firstName} ${lastName}`
      });

      if (!error) {
        return (0, _utils.successResponse)(res, 200, 'Article successfully updated', newArticle);
      }

      return (0, _utils.errorResponse)(res, 500, 'Server error');
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'Internal server error');
    }
  }
  /**
   * @method deleteArticle
   * @description - method for users to delete an existing article
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */


  static async deleteArticle(req, res) {
    // remember to delete image associated with the article
    try {
      const {
        userId
      } = req.user;
      const {
        id: articleId
      } = req.params;
      const {
        result: article
      } = await (0, _helper.getItem)('articles', {
        id: articleId
      });
      if (!article) return (0, _utils.errorResponse)(res, 404, 'Article not found');

      if (article.ownerId !== userId) {
        return (0, _utils.errorResponse)(res, 403, 'Not allowed');
      }

      const {
        result: deleted
      } = await (0, _helper.deleteItem)('articles', articleId);
      if (deleted) return (0, _utils.successResponse)(res, 200, 'Article successfully deleted');
      return (0, _utils.errorResponse)(res, 500, 'Server error deleting article');
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'internal server error');
    }
  }
  /**
   * @method commentArticle
   * @description - method for users to comment on an article
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */


  static async commentArticle(req, res) {
    const {
      comment
    } = req.body;
    const {
      id: articleId
    } = req.params;
    const {
      userId: ownerId,
      firstName,
      lastName
    } = req.user;

    try {
      const {
        result: article
      } = await (0, _helper.getItem)('articles', {
        id: articleId
      });

      if (!article) {
        return (0, _utils.errorResponse)(res, 404, 'No article found');
      }

      const {
        error,
        result: newComment
      } = await (0, _helper.createItem)('comments', {
        comment,
        ownerId,
        authorName: `${firstName} ${lastName}`,
        postId: articleId
      });
      const response = { ...newComment,
        articleTitle: article.title,
        article: article.article
      };

      if (!error) {
        return (0, _utils.successResponse)(res, 201, 'Comment successfully created”', response);
      }

      throw new Error(error);
    } catch (error) {
      console.log(error);
      return (0, _utils.errorResponse)(res, 500, 'internal server error');
    }
  }

}

exports.default = ArticleController;
//# sourceMappingURL=ArticleController.js.map