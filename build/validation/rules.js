"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = exports.createArticle = exports.createGif = exports.loginUser = exports.userRegister = void 0;

var _expressValidator = require("express-validator");

/* eslint-disable import/prefer-default-export */
const nameRegex = /^[A-Za-z\-']{2,250}$/;
const userRegister = [(0, _expressValidator.body)('firstName').matches(nameRegex).trim().withMessage('firstName should be an alphabet between 2 and 250 characters'), (0, _expressValidator.body)('lastName').matches(nameRegex).trim().withMessage('lastName should be an alphabet between 2 and 250 characters'), (0, _expressValidator.body)('password', 'password should be at least 6 characters').isLength({
  min: 6
}), (0, _expressValidator.body)('gender').not().isEmpty().trim().isIn(['male', 'female']).withMessage('please specify male or female'), (0, _expressValidator.body)('jobRole').not().isEmpty().isString().withMessage('Provide a jobRole').trim(), (0, _expressValidator.body)('department').not().isEmpty().isString().withMessage('Provide your department').trim(), (0, _expressValidator.body)('address').not().isEmpty().isString().withMessage('Provide your address').trim(), (0, _expressValidator.body)('email', 'Please provide a valid email').isEmail().isLength({
  min: 3,
  max: 250
}).trim()];
exports.userRegister = userRegister;
const loginUser = [(0, _expressValidator.body)('email').not().isEmpty().isEmail().withMessage('Provide your email').trim(), (0, _expressValidator.body)('password').not().isEmpty().isString().withMessage('Provide your password').trim()];
exports.loginUser = loginUser;
const createGif = [(0, _expressValidator.body)('title').not().isEmpty().isString().withMessage('Provide a title for gif').trim(), (0, _expressValidator.body)('share').optional().isBoolean().withMessage('Share should be true or false else default to true')];
exports.createGif = createGif;
const createArticle = [(0, _expressValidator.body)('title').not().isEmpty().isString().withMessage('Provide a title for article').trim(), (0, _expressValidator.body)('article').not().isEmpty().isString().withMessage('Provide a title for article').trim(), (0, _expressValidator.body)('share').optional().isBoolean().withMessage('Share should be true or false else default to true')];
exports.createArticle = createArticle;
const comment = [(0, _expressValidator.body)('comment').not().isEmpty().isString().withMessage('Provide your comment').trim()];
exports.comment = comment;
//# sourceMappingURL=rules.js.map