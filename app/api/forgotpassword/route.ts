import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/db";
import dbConnect from "@/lib/mongodb";
import { generateOTP, sendEmail, sendEmailForgotpassword } from "@/app/utils/otp";

export async function POST(req: any) {
    try {
        const { email } = await req.json();

        console.log("otp backend", email)
        const db = await dbConnect();

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if (!existingUser) {
            return NextResponse.json({ message: "Email Not exists." }, { status: 400 });
        }
        console.log("4")
        console.log(existingUser.forgototp)
        const forgototp = generateOTP();
        existingUser.forgototp = forgototp;
        await existingUser.save();
        await sendEmailForgotpassword(email, "Forgot Password", "Click the link below to reset your password.", forgototp);

        console.log("5")
        return NextResponse.json({ message: "ForgotOTP send Successfully." }, { status: 201 });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}

