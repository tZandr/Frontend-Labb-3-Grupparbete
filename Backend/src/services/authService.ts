import { hashPassword } from '../utils/password';
import { generateToken } from '../utils/generatetoken';
import { RegisterRequest, AuthResponse } from '../types/authTypes';

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const hashedPassword = await hashPassword(data.password);

  const user = {
    id: 1,
    name: data.name,
    email: data.email,
  };

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
