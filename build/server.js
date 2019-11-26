"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _docs = _interopRequireDefault(require("../docs"));

var _initDb = _interopRequireDefault(require("./database/initDb"));

var _routes = _interopRequireDefault(require("./routes"));

var _Logger = _interopRequireDefault(require("./middlewares/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)()); // Initialize db, create tables if not present
// do this if current environment is not test

if (process.env.NODE_ENV !== "test") {
  (0, _initDb.default)();
}

app.use((0, _expressFileupload.default)()); // setup express body-perser for json data

app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the teamwork Backend API, enjoy"
  });
});
app.use("/api/v1/docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_docs.default));
app.use("/api/v1", _Logger.default, _routes.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=server.js.map