"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _config = require("../config");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = reqFile => {
  const currentEnv = process.env.NODE_ENV;
  const file = reqFile; // change file name to a unique one

  file.name = (0, _utils.renameFile)(file.name);
  const path = `${__dirname}/../temp/${file.name}`;
  return new Promise((resolve, reject) => {
    // temporary store file in server
    file.mv(path, err => {
      if (err) return reject(err);
    }); // upload stored file to cloudinary

    try {
      const res = currentEnv === 'test' ? {
        secure_url: 'http://test.png'
      } : _config.cloudinary.v2.uploader.upload(path, {
        folder: `/teamwork/${file.mimetype}`,
        use_filename: true
      }); // remove stored file and return upload result

      _fs.default.unlink(path, err => {
        if (err) return reject(err);
      });

      return resolve(res);
    } catch (uploadErr) {
      reject(uploadErr);
    }
  });
};

exports.default = _default;
//# sourceMappingURL=cloudinary.js.map