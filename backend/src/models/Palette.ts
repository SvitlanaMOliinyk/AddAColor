import mongoose, {Schema, Types} from "mongoose";

interface IPalette {
    paletteName: string,
    public_id: string,
    url: string,
    user?: Types.ObjectId
}

const paletteSchema = new mongoose.Schema <IPalette>(
  {
    paletteName: { type: String, required: true},
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    user: {type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const Palette = mongoose.model("Palette", paletteSchema);

export default Palette;
