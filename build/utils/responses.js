"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successResponsArray = exports.errorResponse = exports.successResponse = void 0;
const statusRes = {
  200: 'success',
  401: 'Authentication error',
  201: 'success',
  400: 'error',
  403: 'error, not allowed',
  404: 'Error, not found'
};
/**
   * comparePassword
   * @param {object} res - response object
   * @param {number} status - status of the error
   * @param {string} message - error message
   * @returns {Object} return response object
   */

const errorResponse = (res, status, message) => {
  res.status(status).json({
    status,
    error: message
  });
};

exports.errorResponse = errorResponse;

const successResponse = (res, status, message = null, payload = null) => {
  const response = {
    status: statusRes[status],
    data: {
      message,
      ...payload
    }
  };
  res.status(status).json(response);
};

exports.successResponse = successResponse;

const successResponsArray = (res, status, arrayData) => {
  const response = {
    status: statusRes[status],
    data: arrayData
  };
  res.status(status).json(response);
};

exports.successResponsArray = successResponsArray;
//# sourceMappingURL=responses.js.map