import express from "express";
import { getAuthenticatedUser, createUser, loginUser, logoutUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getAuthenticatedUser);
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
