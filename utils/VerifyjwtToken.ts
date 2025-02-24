import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = "dharmik";

export const VerifyjwtToken = async (token: string) => {
  const decodedToken: any = jwt.verify(token, secretKey);
  const userId = decodedToken.details.id;
  return userId;
};
