import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/userTypes';

export function generateToken(payload: JwtPayload): string {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    );
}
