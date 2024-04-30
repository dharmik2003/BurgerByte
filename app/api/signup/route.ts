import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import dbConnect from "@/lib/mongodb";
import { generateOTP, sendEmail } from "@/app/utils/otp";

export async function POST(req: any) {
    try {
        const { name, email, password, isVerified,admin } = await req.json();

        const db = await dbConnect();
        console.log("isVerified signup", isVerified)
        
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already exists." }, { status: 400 });
        }
        const otp = generateOTP();
        console.log("otp", otp)

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, otp, isVerified: isVerified,admin:admin });
        console.log("newUser", newUser)
        console.log("isVerified:", newUser.isVerified);
        console.log("createdAt:", newUser.createdAt); 
        console.log("updatedAt:", newUser.updatedAt); 


        await newUser.save();

        await sendEmail(email, "Email Verify", `Your OTP is: ${otp}`);

        return NextResponse.json({ message: "User registered." }, { status: 201 });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}


export async function DELETE(req: any) {
    try {
        const { email } = await req.json();
        console.log("deleteemail",email)

        const db = await dbConnect();

        // Find the user by email and delete it
        console.log("1")
        const deletedUser = await User.findOneAndDelete({ email });
        console.log("2")
        if (!deletedUser) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }
        console.log("3")
        return NextResponse.json({ message: "User deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { message: "An error occurred while deleting the user." },
            { status: 500 }
        );
    }
}

export async function PUT(req: any) {
    try {
        const { email, name, password, isVerified,image } = await req.json();

        // Connect to MongoDB
        console.log("update put signup")
        // console.log("isVerified", isVerified)
        // console.log("password", password)
        console.log("image", image)
        const db = await dbConnect();

        // Find the user by email
        console.log("1")
        const user = await User.findOne({ email });

        console.log("2")
        // Check if user exists
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        console.log("3")
        // Update user data based on provided fields
        if (name !== undefined) user.name = name;
        if (image !== undefined) user.image = image;
        if (password !== undefined) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        if (isVerified !== undefined) user.isVerified = isVerified;
        console.log("4")
        // Save updated user data
        await user.save();

        return NextResponse.json({ message: "User updated successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { message: "An error occurred while updating the user." },
            { status: 500 }
        );
    }
}

//api/signup
export async function GET(req: any) {
    try {
        // const { email } = await req.json();

        // Connect to MongoDB
        console.log("GET put signup")
        const db = await dbConnect();

        // Find the user by email
        console.log("1")
        const user = await User.find();

        console.log("2")
        // Check if user exists
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        console.log("3")
        console.log(user)
        // Update user data based on provided fields

        return NextResponse.json({ message: "User updated successfully.",user }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { message: "An error occurred while updating the user." },
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