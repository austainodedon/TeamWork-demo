import express from "express";
import { validate, Authenticate } from "../../middlewares";
import { UserController } from "../../controllers";

const { verifyAdmin, verifyToken, verifyRootUser } = Authenticate;
const { registerUser, loginUser, getUsers, getUser } = UserController;

const router = express.Router();

/*
  @Description: endpoint for admin get all users
  @Access: private only admin users
  @Route: <domain>/api/v1/auth/users
*/
router.get("/users", verifyToken, verifyAdmin, getUsers);
/*
  @Description: endpoint to get current user
  @Access: private only current users
  @Route: <domain>/api/v1/auth/user
*/
router.get("/user", verifyToken, getUser);

/*
  @Description: endpoint for admin to add user
  @Access: private only admin users
  @Route: <domain>/api/v1/auth/create-user
*/
router.post(
  "/create-user",
  validate("userRegister"),
  verifyToken,
  verifyAdmin,
  registerUser
);

/*
  @Description: endpoint to create a root user
  @Access: private only request with valid secret
  @Route: <domain>/api/v1/auth/create-user-root
*/
router.post(
  "/create-user-root",
  validate("userRegister"),
  verifyRootUser,
  registerUser
);

/*
  @Description: endpoint for admin/employee to sign in
  @Access: prublic any user with valid details
  @Route: <domain>/api/v1/auth/signin
*/
router.post("/signin", validate("loginUser"), loginUser);

export default router;
