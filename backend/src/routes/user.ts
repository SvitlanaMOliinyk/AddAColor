import express from "express";
import { getAuthenticatedUser, createUser, loginUser, logoutUser, updateUser, getUserPhoto } from "../controllers/user.js";

const router = express.Router();

router.get("/", getAuthenticatedUser);
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update", updateUser);
router.get("/photo/:id", getUserPhoto);



export default router;
