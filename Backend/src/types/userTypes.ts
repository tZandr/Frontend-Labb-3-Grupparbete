export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    avatar_url: string;
    created_at: Date;
}

export interface JwtPayload {
    userId: number;
    email: string;
}
