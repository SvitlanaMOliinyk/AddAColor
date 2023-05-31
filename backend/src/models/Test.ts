import mongoose, {Schema, Types} from "mongoose";

interface ITest {
    testName: string,
    public_id: string,
    url: string,
    palette?: Types.ObjectId
}

const testSchema = new mongoose.Schema <ITest>(
  {
    testName: { type: String, required: true},
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    palette: {type: Schema.Types.ObjectId, ref: 'Palette' }
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);

export default Test;
