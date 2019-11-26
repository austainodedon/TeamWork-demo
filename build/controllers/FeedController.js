"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _helper = require("../database/query/helper");

/**
 * @class FeedController
 * @description Controller to manage feeds
 * @exports FeedController
 */
class FeedController {
  /**
  * @method getFeeds
  * @description - method to get all articles
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} request response body
  */
  static async getFeeds(req, res) {
    try {
      const {
        result: gifs
      } = await (0, _helper.getItems)('gifs');
      const {
        result: articles
      } = await (0, _helper.getItems)('articles');
      const feeds = [...gifs, ...articles];
      const sorted = feeds.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
      return (0, _utils.successResponsArray)(res, 200, sorted);
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'Server error');
    }
  }

}

exports.default = FeedController;
//# sourceMappingURL=FeedController.js.map