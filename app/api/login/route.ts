import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/app/models/user";
import jwt from 'jsonwebtoken';


export async function POST(req: any) {
    try {
        const { email, password } = await req.json();

        // Connect to MongoDB
        const db = await dbConnect();
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }
        // Check if user is verified
        if (!user.isVerified) {
            return NextResponse.json({ message: "User is not verified." }, { status: 403 });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if passwords match
        if (!passwordMatch) {
            return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
        }
        const details = {
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            admin: user.admin,
            password: user.password,
            createAt: user.createdAt,
            updateAt: user.updatedAt,
        };

        const token = jwt.sign({ details }, process.env.JWT_SECRET as string);
        const userdata={
            user, password, token
        }

        // Passwords match, user authenticated
        return NextResponse.json({ message: "User logged in successfully.", userdata }, { status: 200 });
    } catch (error) {
        console.error("Error logging in user:", error);
        return NextResponse.json(
            { message: "An error occurred while logging in the user." },
            { status: 500 }
        );
    }
}
