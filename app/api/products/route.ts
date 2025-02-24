import { NextResponse } from "next/server";
import ProductModel, { Product } from "@/app/models/ProductModel";
import dbConnect from "@/lib/mongodb";


// export async function POST(req: any) {
//     try {
//         const { title, image, review, price, rating } = await req.json();

//         // Create a new order document
//         const newOrder = new ProductModel({
//             title,
//             image,
//             review,
//             price,
//             rating
//         });

//         // Save the order to the database
//         await newOrder.save();

//         return NextResponse.json({ message: "Product Added successfully." }, { status: 201 });

//     } catch (error) {
//         console.error("Error placing order:", error);
//         return NextResponse.json(
//             { message: "An error occurred while placing the order." },
//             { status: 500 }
//         );
//     }
// }


export async function POST(req: any) {
    try {
        const { title, image, review, price, rating } = await req.json();

        const db = await dbConnect();
        const newProduct = new ProductModel({
            title,
            image,
            review,
            price,
            rating
        });

        // Save the product to the database
        await newProduct.save();

        return NextResponse.json({ message: "Product Added successfully." }, { status: 201 });

    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json(
            { message: "An error occurred while adding the product." },
            { status: 500 }
        );
    }
}

export async function PUT(req: any) {
    try {
        const {id, title, image, review, price, rating } = await req.json();

        const db = await dbConnect();

        const items = await ProductModel.findOne({ _id: id });
        // Check if user exists
        if (!items) {
            return NextResponse.json({ message: "Item not found." }, { status: 404 });
        }
        if (title !== undefined) items.title = title;
        if (image !== undefined) items.image = image;
        if (review !== undefined) items.review = review;
        if (price !== undefined) items.price = price;
        if (rating !== undefined) items.rating = rating;

        // Save the product to the database
        await items.save();
        return NextResponse.json({ message: "Product Update successfully." }, { status: 201 });

    } catch (error) {
        console.error("Error update product:", error);
        return NextResponse.json(
            { message: "An error occurred while update the product." },
            { status: 500 }
        );
    }
}


export async function DELETE(req: any) {
    try {
        const { id } = await req.json(); 

        const db = await dbConnect();

        // Find the product by its ID and delete it
        const result = await ProductModel.deleteOne({ _id: id });

        // Check if the product was found and deleted
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Food not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 });

    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { message: "An error occurred while deleting the product." },
            { status: 500 }
        );
    }
}




export async function GET(req: any) {
    try {
        const db = await dbConnect();
        const products: Product[] = await ProductModel.find({});
        
        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching products." },
            { status: 500 }
        );
    }
}
