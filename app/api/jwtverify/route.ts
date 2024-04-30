import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Your secret key used for signing JWT tokens
const secretKey = "dharmik";

export async function POST(req: any) {
    try {
        const { token } = await req.json();


        console.log("jwt verify", token)
        const decodedToken: any = jwt.verify(token, secretKey);
        console.log(decodedToken)
        // Assuming your JWT token payload contains user information including the ID
        const userId = decodedToken.details.id;
        console.log("userId backend", userId)

        // If token is verified successfully, return a success response
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
