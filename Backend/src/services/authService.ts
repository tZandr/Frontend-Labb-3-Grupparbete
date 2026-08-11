import { getDatabase } from '../config/db';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/generatetoken';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types/authTypes';
import { User } from '../types/userTypes';

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const users = (await getDatabase()).collection<User>('users');
  const existing = await users.findOne({ email: data.email });

  if (existing) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const hashedPassword = await hashPassword(data.password);

  const result = await users.insertOne({ name: data.name, email: data.email, password_hash: hashedPassword, created_at: new Date() } as User);
  const userId = result.insertedId.toHexString();

  const token = generateToken({ userId, email: data.email });

  return {
    token,
    user: { id: userId, name: data.name, email: data.email },
  };
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const users = (await getDatabase()).collection<User>('users');
  const user = await users.findOne({ email: data.email });

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const passwordMatch = await comparePassword(data.password, user.password_hash);

  if (!passwordMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const userId = user._id.toHexString();
  const token = generateToken({ userId, email: user.email });

  return {
    token,
    user: { id: userId, name: user.name, email: user.email },
  };
}
