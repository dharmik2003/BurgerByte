import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = "dharmik";

export async function POST(req: any) {
    try {
        const { token } = await req.json();

        console.log("jwt verify", token)
        const decodedToken: any = jwt.verify(token, secretKey);
        console.log(decodedToken)
        const userId = decodedToken.details.id;
        console.log("userId backend", userId)
        console.log("Token verified successfully for user ID:", userId);
        return NextResponse.json({ message: "Token verified successfully.", userId }, { status: 201 });

    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.json(
            { message: "An error occurred while verifying the token." },
            { status: 500 }
        );
    }
}
