import { Schema, model, Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  created_at: Date;
  updated_at?: Date;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  avatar_url: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const UserModel = model<User>("User", userSchema, "users");

export interface JwtPayload {
  userId: string;
  email: string;
}
