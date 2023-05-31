import { RequestHandler } from "express";
import Palette from "../models/Palette.js";

export const getPalette: RequestHandler = async (req, res) => {
  const { key } = req.params
  console.log("Params:", key)
  try {
    const palette = await Palette.find({paletteName: { $regex: key, $options: "i" } }).exec();
    console.log("palette:", palette)
    res.status(200).json({ success: true, result: palette });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
