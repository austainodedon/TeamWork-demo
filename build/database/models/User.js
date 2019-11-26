"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const User = `
    CREATE TABLE IF NOT EXISTS
      users(
        "id" VARCHAR(128) PRIMARY KEY,
        "firstName" VARCHAR(128) NOT NULL,
        "lastName" VARCHAR(128) NOT NULL,
        "email" VARCHAR(128) NOT NULL,
        "password" VARCHAR(128) NOT NULL,
        "gender" VARCHAR(128) NOT NULL,
        "jobRole" VARCHAR(128) NOT NULL,
        "department" VARCHAR(128) NOT NULL,
        "address" VARCHAR(128) NOT NULL,
        "avaterUrl" VARCHAR(128),
        "userRole" VARCHAR(128),
        UNIQUE(email)
      )`;
var _default = User; //id UUID PRIMARY KEY DEFAULT gen_random_uuid()

exports.default = _default;
//# sourceMappingURL=User.js.map