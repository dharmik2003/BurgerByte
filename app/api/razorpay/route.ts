import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CartItem from "@/app/models/CartItem";
import { BurgerItem } from "@/app/Redux/Order/OrderSlice";
import { razorpay } from "@/app/utils/razorpay.config";
import { VerifyjwtToken } from "@/utils/VerifyjwtToken";

export async function POST(req: any) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token is missing or invalid." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }
    const userId = await VerifyjwtToken(token);
    const { orderId } = req.body;
    const db = await dbConnect();

    const orders = await CartItem.find({ userId: userId });

    if (!orders) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }
    let totalAmount = 0;

    let total = 0;
    orders.forEach((order: BurgerItem) => {
      total += order.price * order.quantity;
    });
    totalAmount = +total.toFixed(2);

    const paymentlink = await razorpay.paymentLink.create({
      amount: totalAmount * 100,
      currency: "INR",
      // "expire_by": new Date().setMinutes(new Date().getMinutes() + 15),
      reference_id: orderId,
      description: "Payment for policy no #23456",
      customer: {
        name: `dk`,
        contact: `9988774411`,
        email: "dk@gmail.com",
        // "name": "dk",
        // "contact": "9874563210",
        // "email": "dkk@gmail.com"
        // "name": userId1.name,
        // "contact": userId1.phoneNumber,
        // "email": userId1.email
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      notes: {
        policy_name: "Jeevan Bima",
      },
      callback_url: `http://localhost:3000/paymentdone`,
      // callback_url: "https://burgerbyte.vercel.app/paymentdone",
      callback_method: "get",
      options: {
        checkout: {
          name: "Burger Byte",
          method: {
            netbanking: true,
            card: true,
            upi: true,
            wallet: true,
          },
        },
      },
    });

    const paymentID = paymentlink.id;
    const paymenturl = paymentlink.short_url;

    return NextResponse.json(
      { message: "Product Added successfully.", paymentID, paymenturl },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "An error occurred while Razorpay Payment" },
      { status: 500 }
    );
  }
}
