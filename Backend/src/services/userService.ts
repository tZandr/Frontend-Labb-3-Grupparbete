import { UserModel } from '../types/userTypes';
import type { User } from '../types/userTypes';

export async function getUserById(userId: string): Promise<User> {
  const user = await UserModel.findById(userId).select('-password_hash');
  if (!user) throw new Error('USER_NOT_FOUND');
  return user;
}

export async function updateUser(
  userId: string,
  data: { name?: string; avatar_url?: string },
): Promise<User> {
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { ...data, updated_at: new Date() },
    { returnDocument: 'after', runValidators: true },
  ).select('-password_hash');
  if (!user) throw new Error('USER_NOT_FOUND');
  return user;
}
