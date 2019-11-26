"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _utils = require("../utils");

var _helper = require("../database/query/helper");

var _bcrypt = require("../utils/bcrypt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class UserController
 * @description Controller to manage user actions
 * @exports UserController
 */
class UserController {
  /**
   * @method registerUser
   * @description - method for admin/root to register a new user
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */
  static async registerUser(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address,
      userRole,
      avaterUrl
    } = req.body; // verify user dont already exist

    try {
      const {
        result
      } = await (0, _helper.getItem)('users', {
        email
      });

      if (result) {
        return (0, _utils.errorResponse)(res, 409, 'user already exist');
      } // remember to update id


      const {
        error: createError,
        result: newUser
      } = await (0, _helper.createItem)('users', {
        id: (0, _v.default)(),
        firstName,
        lastName,
        password: password ? (0, _utils.hashPassword)(password) : undefined,
        email,
        gender,
        jobRole,
        department,
        address,
        userRole: userRole ? userRole.toLowerCase() : 'employee',
        avaterUrl: avaterUrl || 'none'
      });

      if (createError) {
        throw new Error(createError);
      }

      const {
        password: ignored,
        ...rest
      } = newUser;
      const token = await (0, _utils.generateToken)({
        userId: rest.id,
        firstName,
        lastName
      });
      const response = { ...rest,
        userId: rest.id,
        token
      };
      (0, _utils.successResponse)(res, 201, 'User account successfully created”', response);
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'Server error');
    }
  }
  /**
   * @method loginUser
   * @description - method for users to login
   * @param {object} req - request object
   * @param {object} res - response object
   * @return {object} request response body
   */


  static async loginUser(req, res) {
    const {
      password,
      email
    } = req.body;

    try {
      const {
        result: user
      } = await (0, _helper.getItem)('users', {
        email
      });

      if (user) {
        const {
          firstName,
          id,
          lastName,
          password: userPassword
        } = user;
        const isPassValid = (0, _bcrypt.comparePassword)(userPassword, password);

        if (!isPassValid) {
          return (0, _utils.errorResponse)(res, 401, 'Authorzation fail');
        }

        const token = await (0, _utils.generateToken)({
          userId: id,
          firstName,
          lastName
        });
        const data = {
          token,
          userId: id
        };
        return (0, _utils.successResponse)(res, 200, 'success', data);
      }

      return (0, _utils.errorResponse)(res, 401, 'Authorzation fail');
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'Server Error!');
    }
  }
  /**
  * @method getUsers
  * @description - method for admin to get all users
  * @param {object} req - request object
  * @param {object} res - response object
  * @return {object} request response body
  */


  static async getUsers(req, res) {
    try {
      const {
        error,
        result: users
      } = await (0, _helper.getItems)('users');

      if (error) {
        return (0, _utils.errorResponse)(res, 500, 'Internal server error');
      }

      const noPasswords = users.map(user => {
        delete user.password;
        return user;
      });
      return (0, _utils.successResponsArray)(res, 200, noPasswords);
    } catch (error) {
      return (0, _utils.errorResponse)(res, 500, 'Server error');
    }
  }

}

exports.default = UserController;
//# sourceMappingURL=UserController.js.map