import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/user";
import dbConnect from "@/lib/mongodb";
import { generateOTP, sendEmail } from "@/app/utils/otp";

export async function POST(req: any) {
  try {
    const { name, email, password, isVerified, admin, address } =
      await req.json();

    const db = await dbConnect();

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }
    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      isVerified: isVerified,
      admin: admin,
      address: address,
    });

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

    const db = await dbConnect();

    // Find the user by email and delete it
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the user." },
      { status: 500 }
    );
  }
}

export async function PUT(req: any) {
  try {
    const { email, name, password, isVerified, image, address } =
      await req.json();

    // Connect to MongoDB
    const db = await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Update user data based on provided fields
    if (name !== undefined) user.name = name;
    if (image !== undefined) user.image = image;
    if (address !== undefined) user.address = address;
    if (password !== undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (isVerified !== undefined) user.isVerified = isVerified;
    // Save updated user data
    await user.save();

    return NextResponse.json(
      { message: "User updated successfully." },
      { status: 200 }
    );
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
    const db = await dbConnect();

    // Find the user by email
    const user = await User.find();

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Update user data based on provided fields
    return NextResponse.json(
      { message: "User updated successfully.", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the user." },
      { status: 500 }
    );
  }
}
