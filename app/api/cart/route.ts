import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CartItem from "@/app/models/CartItem";
import User from "@/app/models/user";
import { VerifyjwtToken } from "@/utils/VerifyjwtToken";

export async function POST(req: any) {
  
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

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const { productId, image, name, price, quantity, orderId } =
      await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!productId || !quantity || !image || !name || !price) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await dbConnect();

    const cartItem = new CartItem({
      userId,
      productId,
      orderId,
      name,
      image,
      price,
      quantity,
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

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }
    const { productId, image, name, price, quantity, orderId } =
      await req.json();

    const db = await dbConnect();
    const orders = await CartItem.findOne({ userId, productId, orderId });

    if (!orders) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    // if (userId !== undefined) orders.userId = userId;
    if (productId !== undefined) orders.productId = productId;
    if (quantity !== undefined) orders.quantity = quantity;
    if (orderId !== undefined) orders.orderId = orderId;

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
    const cartItems = await CartItem.find({ userId });
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

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const {  productId, orderId } = await req.json();

    // Find the order by userId, productId, and orderId
    const order = await CartItem.findOne({ userId, productId, orderId });

    // Check if the order exists
    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    // Delete the order
    await CartItem.findByIdAndDelete(order._id);

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
