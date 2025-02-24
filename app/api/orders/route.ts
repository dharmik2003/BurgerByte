import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/app/models/user";
import OrderSchema from "@/app/models/Orders";
import { VerifyjwtToken } from "@/utils/VerifyjwtToken";

export async function POST(req: any) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token is missing or invalid." },
      { status: 401 }
    );
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Token is missing" }, { status: 400 });
  }
  const userId = await VerifyjwtToken(token);

  try {
    const {
      productId,
      image,
      name,
      price,
      quantity,
      orderId,
      payment,
      paymentID,
      orderstatus,
      dispatchorder,
      rejectorder,
    } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!productId || !quantity || !image || !name || !price || !orderId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await dbConnect();

    const cartItem = new OrderSchema({
      userId,
      productId,
      orderId,
      name,
      image,
      price,
      quantity,
      payment,
      paymentID,
      orderstatus,
      dispatchorder,
      rejectorder,
    });
    await cartItem.save();
    return NextResponse.json(
      { message: "Item added to cart successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "An error occurred while adding item to cart" },
      { status: 500 }
    );
  }
}

export async function PUT(req: any) {
  try {
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token is missing or invalid." },
        { status: 401 }
      );
    }
  
    // Extract the token from the header
    const token = authHeader.split(" ")[1];
  
    if (!token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }
    const userId = await VerifyjwtToken(token);

    const {
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

    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token is missing or invalid." },
        { status: 401 }
      );
    }
  
    // Extract the token from the header
    const token = authHeader.split(" ")[1];
  
    if (!token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }
    const userId = await VerifyjwtToken(token);

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }
    const db = await dbConnect();
    const cartItems = await OrderSchema.find({ userId });
    return NextResponse.json({ cartItems }, { status: 200 });
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

    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token is missing or invalid." },
        { status: 401 }
      );
    }
  
    // Extract the token from the header
    const token = authHeader.split(" ")[1];
  
    if (!token) {
      return NextResponse.json(
        { message: "Token is missing" },
        { status: 400 }
      );
    }
    const userId = await VerifyjwtToken(token);

    const {  productId, orderId } = await req.json();

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
