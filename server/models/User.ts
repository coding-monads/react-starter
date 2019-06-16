import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  activationKey: string;
  lastResetToken?: string;
  roles: [string];
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      uniqueCaseInsensitive: true
    },
    password: {
      type: String,
      required: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    activationKey: {
      type: String
    },
    lastResetToken: {
      type: String
    },
    roles: [String]
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("users", UserSchema);

export default User;
