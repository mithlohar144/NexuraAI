import { Router } from "express";
import { loginValidation, registerValidation } from "../validator/auth.validator.js";
import { getMe, login, register, verifyEmail, logoutUser } from "../controller/auth.controller.js";
import { authUser } from "../middleware/auth.middelware.js";


const authRouter = Router();


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerValidation, register);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return JWT token
 * @access Public
 */

authRouter.post("/login", loginValidation, login);
/**
 * @route POST /api/auth/get-me
 * @desc Get current authenticated user's info
 * @access Private
 */
/**
 * @route GET /api/auth/logout
 * @desc Logout user by blacklisting the token
 * @access Private
 */

authRouter.get('/logout', logoutUser)


/**
 * @route GET /api/auth/get-me
 * @desc Get current authenticated user's info
 * @access Private
 */

authRouter.get("/get-me", authUser, getMe);

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 */
authRouter.get("/verify-email", verifyEmail);

export default authRouter;