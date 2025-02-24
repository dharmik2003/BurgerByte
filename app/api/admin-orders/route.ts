import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/app/models/user";
import OrderSchema from "@/app/models/Orders";


export async function PUT(req: any) {
  try {
    const {
      userId,
      productId,
      image,
      name,
      price,
      quantity,
      orderId,
      payment,
      paymentID,
      orderstatus,
      rejectorder,
      dispatchorder,
    } = await req.json();

    const db = await dbConnect();

    // Find the user by email
    const orders = await OrderSchema.findOne({ userId, productId, orderId });

    // Check if user exists
    if (!orders) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    
    // Update user data based on provided fields
    if (userId !== undefined) orders.userId = userId;
    if (productId !== undefined) orders.productId = productId;
    if (quantity !== undefined) orders.quantity = quantity;
    if (orderId !== undefined) orders.orderId = orderId;
    if (payment !== undefined) orders.payment = payment;
    if (paymentID !== undefined) orders.paymentID = paymentID;
    if (orderstatus !== undefined) orders.orderstatus = orderstatus;
    if (rejectorder !== undefined) orders.rejectorder = rejectorder;
    if (dispatchorder !== undefined) orders.dispatchorder = dispatchorder;

    await orders.save();

    return NextResponse.json(
      { message: "Order updated successfully." },
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


export async function GET(req: any) {
  try {
    const db = await dbConnect();
    const orderData = await OrderSchema.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);

    
    return NextResponse.json({ orderData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
}


export async function DELETE(req: any) {
  try {
    const { userId, productId, orderId } = await req.json();

    // Find the order by userId, productId, and orderId
    const order = await OrderSchema.findOne({ userId, productId, orderId });

    // Check if the order exists
    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    // Delete the order
    await OrderSchema.findByIdAndDelete(order._id);

    return NextResponse.json(
      { message: "Order deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the order." },
      { status: 500 }
    );
  }
}
