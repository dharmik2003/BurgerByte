import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CartItem from "@/app/models/CartItem";
import { razorpay } from "@/app/utils/razorpay.config";
import OrderSchema from "@/app/models/Orders";
import { ObjectId } from "mongodb";
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
    const { razorpay_payment_id } = await req.json();

    if (!razorpay_payment_id) {
      return NextResponse.json(
        { message: "Payment Id is required" },
        { status: 400 }
      );
    }

    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    if (paymentDetails.status === "captured") {
      await dbConnect();

      const existingOrder = await OrderSchema.findOne({ paymentID: razorpay_payment_id });
      if (existingOrder) {
        return NextResponse.json(
          { message: "Order already processed" },
          { status: 400 }
        );
      }

      const cartItems = await CartItem.find({ userId: userId });

      if (cartItems.length === 0) {
        return NextResponse.json(
          { message: "No items in the cart to process." },
          { status: 400 }
        );
      }
      
    
      const ordersToCreate = [];

      // Iterate over each cart item and create an order
      for (let cartItem of cartItems) {
        const newOrder = new OrderSchema({
          userId: new ObjectId(userId),
          productId: cartItem.productId,
          orderId: razorpay_payment_id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price,
          quantity: cartItem.quantity,
          payment: true,
          paymentID: razorpay_payment_id,
        });

        // Add the new order to the array
        ordersToCreate.push(newOrder);
      }

      // Save all orders in a batch
      await OrderSchema.insertMany(ordersToCreate);

      // Delete all cart items in one go after saving the orders
      await CartItem.deleteMany({ userId: userId });

      return NextResponse.json(
        { message: "Payment verified and orders created successfully!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    return NextResponse.json(
      { message: "An error occurred while processing the payment" },
      { status: 500 }
    );
  }
}
