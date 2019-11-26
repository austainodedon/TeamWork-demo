"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _middlewares = require("../../middlewares");

var _controllers = require("../../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  verifyAdmin,
  verifyToken,
  verifyRootUser
} = _middlewares.Authenticate;
const {
  registerUser,
  loginUser,
  getUsers
} = _controllers.UserController;

const router = _express.default.Router();
/*
  @Description: endpoint for admin get all users
  @Access: private only admin users
  @Route: <domain>/api/v1/auth/users
*/


router.get('/users', verifyToken, verifyAdmin, getUsers);
/*
  @Description: endpoint for admin to add user
  @Access: private only admin users
  @Route: <domain>/api/v1/auth/create-user
*/

router.post('/create-user', (0, _middlewares.validate)('userRegister'), verifyToken, verifyAdmin, registerUser);
/*
  @Description: endpoint to create a root user
  @Access: private only request with valid secret
  @Route: <domain>/api/v1/auth/create-user-root
*/

router.post('/create-user-root', (0, _middlewares.validate)('userRegister'), verifyRootUser, registerUser);
/*
  @Description: endpoint for admin/employee to sign in
  @Access: prublic any user with valid details
  @Route: <domain>/api/v1/auth/signin
*/

router.post('/signin', (0, _middlewares.validate)('loginUser'), loginUser);
var _default = router;
exports.default = _default;
//# sourceMappingURL=user.js.map