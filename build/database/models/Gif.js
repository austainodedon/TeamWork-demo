"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Gif = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS
      gifs(
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "ownerId" VARCHAR(128) NOT NULL REFERENCES users(id),
        "title" VARCHAR(128) NOT NULL,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "authorName" VARCHAR(128) NOT NULL,
        "share" boolean DEFAULT true,
        "imageUrl" VARCHAR(128) NOT NULL
      )`;
var _default = Gif;
exports.default = _default;
//# sourceMappingURL=Gif.js.map