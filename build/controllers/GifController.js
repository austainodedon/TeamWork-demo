"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _services = require("../services");

var _helper = require("../database/query/helper");

/**
 * @class UserController
 * @description Controller to manage user actions
 * @exports GifController
 */
class GifController {
  /**
   * @method createGif
   * @description - method for users to create gif
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */
  static async createGif(req, res) {
    const {
      title,
      share
    } = req.body;
    const {
      userId: ownerId,
      firstName,
      lastName
    } = req.user;

    if (!req.files || !req.files.image) {
      return (0, _utils.errorResponse)(res, 400, "Please provide an image");
    }

    const {
      image
    } = req.files;

    try {
      const {
        secure_url: secureUrl
      } = await (0, _services.uploadCloudinary)(image);
      const {
        error,
        result: newGif
      } = await (0, _helper.createItem)("gifs", {
        title,
        ownerId,
        share: share === "false" ? share : true,
        imageUrl: secureUrl,
        authorName: `${firstName} ${lastName}`
      });

      if (!error) {
        return (0, _utils.successResponse)(res, 201, "Gif created successfuly", newGif);
      }

      return (0, _utils.errorResponse)(res, 500, "Server error");
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, "Internal server error");
    }
  }
  /**
   * @method getgif
   * @description - method to get all articles
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */


  static async getGif(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        error,
        result: gif
      } = await (0, _helper.getItem)("gifs", {
        id
      });
      const {
        result: commentArr
      } = await (0, _helper.getItems)("comments", {
        postId: id
      });

      if (!error) {
        const response = { ...gif,
          comments: commentArr
        };
        return (0, _utils.successResponse)(res, 200, "Gif posts", response);
      }

      return (0, _utils.errorResponse)(res, 500, "Server error geting items");
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, "Server error");
    }
  }
  /**
   * @method deleteGif
   * @description - method for users to delete an existing gif
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */


  static async deleteGif(req, res) {
    try {
      const {
        userId
      } = req.user;
      const {
        id: gifId
      } = req.params;
      const {
        result: gif
      } = await (0, _helper.getItem)("gifs", {
        id: gifId
      });
      if (!gif) return (0, _utils.errorResponse)(res, 404, "Gif not found");

      if (gif.ownerId !== userId) {
        return (0, _utils.errorResponse)(res, 403, "Not allowed");
      }

      const {
        result: deleted
      } = await (0, _helper.deleteItem)("gifs", gifId);
      if (deleted) return (0, _utils.successResponse)(res, 200, "gif post successfully deleted");
      return (0, _utils.errorResponse)(res, 500, "Server error deleting article");
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, "internal server error");
    }
  }
  /**
   * @method commentArticle
   * @description - method for users to comment on a gif
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */


  static async commentGif(req, res) {
    const {
      userId: ownerId,
      firstName,
      lastName
    } = req.user;

    try {
      const {
        id: gifId
      } = req.params;
      const {
        comment
      } = req.body;
      const {
        result: gif
      } = await (0, _helper.getItem)("gifs", {
        id: gifId
      });

      if (!gif) {
        return (0, _utils.errorResponse)(res, 404, "No article found");
      }

      const {
        error,
        result: newComment
      } = await (0, _helper.createItem)("comments", {
        comment,
        ownerId,
        authorName: `${firstName} ${lastName}`,
        postId: gifId
      });
      const response = { ...newComment,
        gifTitle: gif.title
      };

      if (!error) {
        return (0, _utils.successResponse)(res, 201, "Comment successfully created”", response);
      }

      throw new Error(error);
    } catch (error) {
      console.log(error);
      return (0, _utils.errorResponse)(res, 500, "internal server error");
    }
  }

}

exports.default = GifController;
//# sourceMappingURL=GifController.js.map