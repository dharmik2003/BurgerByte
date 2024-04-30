import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/db";
import dbConnect from "@/lib/mongodb";
import { generateOTP, sendEmail } from "@/app/utils/otp";

export async function POST(req: any) {
    try {
        const { email, otp } = await req.json();

        console.log("otp backend",otp)
        console.log("otp backend",email)
        const db = await dbConnect();

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if (!existingUser) {
            return NextResponse.json({ message: "Email Not exists." }, { status: 400 });
        }
        console.log("4")
        console.log(existingUser.otp)
        if (existingUser.otp.toString() !== otp) {
            return NextResponse.json({ message: "Invalid OTP." }, { status: 401 });
        }
        console.log("5")
        return NextResponse.json({ message: "OTP correct." }, { status: 201 });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}


// export async function GET(req: any) {
//     try {
//         // Connect to MongoDB
//         const db = await dbConnect();
//         console.log("Connected to MongoDB");

//         // Fetch all users from the database
//         const users = await User.find({});

//         // Return the fetched users
//         return NextResponse.json({ users }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         // Return an error response
//         return NextResponse.json(
//             { message: "An error occurred while fetching users." },
//             { status: 500 }
//         );
//     }
// }