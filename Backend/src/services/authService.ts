import db from '../config/db';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/generatetoken';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types/authTypes';
import { User } from '../types/userTypes';

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const [existing] = await db.query<User[]>(
    'SELECT id FROM users WHERE email = ?',
    [data.email]
  );

  if (existing.length > 0) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const hashedPassword = await hashPassword(data.password);

  const [result] = await db.query<any>(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [data.name, data.email, hashedPassword]
  );

  const userId: number = result.insertId;

  const token = generateToken({ userId, email: data.email });

  return {
    token,
    user: { id: userId, name: data.name, email: data.email },
  };
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const [rows] = await db.query<User[]>(
    'SELECT * FROM users WHERE email = ?',
    [data.email]
  );

  const user = rows[0];

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const passwordMatch = await comparePassword(data.password, user.password_hash);

  if (!passwordMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const token = generateToken({ userId: user.id, email: user.email });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}
