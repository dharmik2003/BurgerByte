import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CartItem from "@/app/models/CartItem";
import { razorpay } from "@/app/utils/razorpay.config";
import { BurgerItem } from "@/app/Redux/Order/OrderSlice";


export async function POST(req: any) {
    try {
        const { orderId } = await req.json();
        console.log("orderId payment", orderId)
        const db = await dbConnect();

        // Check if order exists
        const orders = await CartItem.find({ orderId: orderId });

        console.log("1 payment")
        if (!orders) {
            return NextResponse.json({ message: "Order not found." }, { status: 404 });
        }
        console.log("2 payment")
        console.log(orders)

        let totalAmount=0


        // const calculateTotalAmount = () => {
            let total = 0;
            orders.forEach((order: BurgerItem) => {
                total += order.price * order.quantity;
            });
            totalAmount= +total.toFixed(2);
        
        console.log("totalAmount", totalAmount)
        console.log("orders[0].orderId", orders[0].orderId)

        const paymentlink = await razorpay.paymentLink.create({


            "amount": totalAmount*100,
            "currency": "INR",
            // "expire_by": new Date().setMinutes(new Date().getMinutes() + 15),
            "reference_id": `${orders[0].orderId}`,
            "description": "Payment for policy no #23456",
            "customer": {
                "name": `dk`,
                "contact": `9988774411`,
                "email": "dk@gmail.com"
                // "name": "dk",
                // "contact": "9874563210",
                // "email": "dkk@gmail.com"
                // "name": userId1.name,
                // "contact": userId1.phoneNumber,
                // "email": userId1.email
            },
            "notify": {
                "sms": true,
                "email": true
            },
            "reminder_enable": true,
            "notes": {
                "policy_name": "Jeevan Bima"
            },
            "callback_url": "http://localhost:3000/paymentdone",
            "callback_method": "get",
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
            }

        })

        const paymentID = paymentlink.id
        console.log("paymentID", paymentID)

        const paymenturl = paymentlink.short_url
        console.log("paymenturl", paymenturl)

        return NextResponse.json({ message: "Product Added successfully.", paymentID, paymenturl }, { status: 201 });

    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json(
            { message: "An error occurred while Razorpay Payment" },
            { status: 500 }
        );
    }
}
