import mongoose, {Schema, Types} from "mongoose";


interface IUser {
    userName: string,
    email: string,
    password: string,
    userPicture?: string,
    userPalette?: Types.ObjectId
}

const userSchema = new mongoose.Schema <IUser>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    userPicture: { type: String, default: "" },
    userPalette: {type: Schema.Types.ObjectId, ref: 'Palette' }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;