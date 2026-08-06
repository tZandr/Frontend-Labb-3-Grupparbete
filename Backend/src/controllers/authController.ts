import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const result = await registerUser({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ message: 'Something went wrong during registration' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await loginUser({ email, password });
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(500).json({ message: 'Something went wrong during login' });
  }
}
