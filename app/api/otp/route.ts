import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/db";
import dbConnect from "@/lib/mongodb";
import { generateOTP, sendEmail } from "@/app/utils/otp";

export async function POST(req: any) {
    try {
        const { email, otp } = await req.json();

        const db = await dbConnect();

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ message: "Email Not exists." }, { status: 400 });
        }
        if (existingUser.otp.toString() !== otp) {
            return NextResponse.json({ message: "Invalid OTP." }, { status: 401 });
        }
        return NextResponse.json({ message: "OTP correct." }, { status: 201 });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}
