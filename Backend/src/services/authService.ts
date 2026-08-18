import { UserModel } from '../types/userTypes';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/generatetoken';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types/authTypes';

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const existing = await UserModel.findOne({ email: data.email });

  if (existing) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await UserModel.create({
    name: data.name,
    email: data.email,
    password_hash: hashedPassword,
  });

  const userId = user._id.toString();
  const token = generateToken({ userId, email: data.email });

  return {
    token,
    user: { id: userId, name: data.name, email: data.email },
  };
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const user = await UserModel.findOne({ email: data.email });

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const passwordMatch = await comparePassword(data.password, user.password_hash);

  if (!passwordMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const userId = user._id.toString();
  const token = generateToken({ userId, email: user.email });

  return {
    token,
    user: { id: userId, name: user.name, email: user.email },
  };
}
