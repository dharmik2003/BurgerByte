// lib/jwt.ts
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface JWTPayload {
  userId: string
  // Add other payload fields as needed
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const verified = jwt.verify(token, JWT_SECRET) as JWTPayload
    return verified
  } catch (error) {
    return null
  }
}