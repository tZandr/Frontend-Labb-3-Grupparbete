import { ObjectId } from 'mongodb';

export interface User {
    _id: ObjectId;
    name: string;
    email: string;
    password_hash: string;
    avatar_url?: string;
    created_at: Date;
}

export interface JwtPayload {
    userId: string;
    email: string;
}
