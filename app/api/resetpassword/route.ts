import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/db";
import dbConnect from "@/lib/mongodb";
import { generateOTP, sendEmail, sendEmailForgotpassword } from "@/app/utils/otp";

export async function POST(req: any) {
    try {
        const { email, forgototp } = await req.json();

        // Connect to the database
        await dbConnect();

        // Find the user in the database based on the provided email
        const existingUser = await User.findOne({ email });

        // If user doesn't exist, return an error
        if (!existingUser) {
            return NextResponse.json({ message: "Email does not exist." }, { status: 400 });
        }

        // Check if the provided forgototp matches the one stored in the database
        if (parseInt(existingUser.forgototp) !== parseInt(forgototp)) {
            return NextResponse.json({ message: "Forgot Invalid OTP." }, { status: 400 });
        }

        return NextResponse.json({ message: "ForgotOTP send Successfully." }, { status: 201 });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}

