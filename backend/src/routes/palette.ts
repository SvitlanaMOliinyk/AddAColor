import express from "express";
import { getPalette } from "../controllers/palette.js";

const router = express.Router();

router.get("/:key", getPalette);

export default router;