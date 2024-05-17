import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CartItem from '@/app/models/CartItem';
import User from '@/app/models/user';

export async function POST(req: any) {

        try {
            const { userId, productId, image, name, price, quantity, orderId, payment, paymentID, orderstatus, dispatchorder, rejectorder } = await req.json();
            console.log("0")
            console.log(userId, productId, image, name, price, quantity, orderId, paymentID, payment)
            // Check if the userId and productId are provided
            if (!userId || !productId || !quantity || !image || !name || !price || !orderId ) {
                return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
            }
            console.log("1")
            // Connect to the database
            const db = await dbConnect();

            console.log("2")
                const cartItem = new CartItem({
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
                    rejectorder
                });
                console.log("3")
            await cartItem.save();
            console.log("4")
            return NextResponse.json({ message: 'Item added to cart successfully' }, { status: 201 });
        } catch (error) {
            console.error('Error adding item to cart:', error);
            return NextResponse.json({ message: 'An error occurred while adding item to cart' }, { status: 500 });
        }
    }
  
export async function PUT(req: any) {
    try {
        const { userId, productId, image, name, price, quantity, orderId, payment, paymentID, orderstatus, rejectorder, dispatchorder } = await req.json();

        console.log("payment,paymentID cart api",payment,paymentID)

        const db = await dbConnect();

        console.log(userId, orderId,productId,quantity,)

        // Find the user by email
        console.log("1")
        const orders = await CartItem.findOne({ userId, productId, orderId });

        console.log("2")
        // Check if user exists
        if (!orders) {
            return NextResponse.json({ message: "Order not found." }, { status: 404 });
        }

        console.log("quantity", quantity)
        console.log("3")
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

        console.log("4")
        // Save updated user data
        await orders.save();

        return NextResponse.json({ message: "Order updated successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { message: "An error occurred while updating the user." },
            { status: 500 }
        );
    }
}

// export async function GET(req: any,) {
//         try {
//             console.log("1 get")
//             const db = await dbConnect();
//             console.log("2 get")
//             const cartItems = await CartItem.find({});
//             console.log("cartItems get")
//             console.log("3 get")
//             return NextResponse.json({ cartItems }, { status: 200 });
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             return NextResponse.json(
//                 { message: "An error occurred while fetching order data." },
//                 { status: 500 }
//             );
//         }
// } 



export async function GET(req: any) {
    try {
        console.log("1 get");
        const db = await dbConnect();
        console.log("2 get");

        // Fetch cart items
        const cartItems = await CartItem.find({});

        // Extract unique userIds from cartItems
        const userIds = Array.from(new Set(cartItems.map(item => item.userId)));

        // Fetch user data based on userIds
        const userData = await User.find({ _id: { $in: userIds } });

        console.log("cartItems get");
        console.log("3 get");

        return NextResponse.json({ cartItems, userData }, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching order data." },
            { status: 500 }
        );
    }
}


export async function DELETE(req: any) {
    try {
        const { userId, productId, orderId } = await req.json();

        // Find the order by userId, productId, and orderId
        const order = await CartItem.findOne({ userId, productId, orderId });

        // Check if the order exists
        if (!order) {
            return NextResponse.json({ message: "Order not found." }, { status: 404 });
        }

        // Delete the order
        await CartItem.findByIdAndDelete(order._id);

        return NextResponse.json({ message: "Order deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json(
            { message: "An error occurred while deleting the order." },
            { status: 500 }
        );
    }
}
