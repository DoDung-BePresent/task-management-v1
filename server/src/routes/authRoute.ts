import { Router } from "express";

/**
 * Controllers
 */
import { authController } from "../controllers/authController";

/**
 * Middlewares
 */
import { authenticate } from "../middlewares/authenticate";

const authRoute = Router();

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.post("/logout", authenticate, authController.logout);
authRoute.post("/refresh-token", authController.refreshToken);

export default authRoute;
