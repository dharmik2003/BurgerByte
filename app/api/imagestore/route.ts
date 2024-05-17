// import { NextResponse } from "next/server";
// import ProductModel, { Product } from "@/app/models/ProductModel";
// import dbConnect from "@/lib/mongodb";
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: 'BurgerByte',
//     api_key: '882267254979685',
//     api_secret: 'wPGfPBTotb6dk8tWj-Uh3ks7nGs'
// });

// export async function POST(req: any) {
//     try {
//         console.log("1111")
//         const { image } = await req.json();
//         console.log("2222",image)
//         // Upload image to Cloudinary here and get the imageUrl
//         const imageUrl = await uploadImageToCloudinary(image);
//         console.log("3333",imageUrl)
//         return NextResponse.json({ message: "Image uploaded successfully in Cloudinary.", imageUrl }, { status: 201 });
//     } catch (error) {
//         console.error("Error uploading image:", error);
//         return NextResponse.json({ message: "An error occurred while uploading the image." }, { status: 500 });
//     }
// }

// // Function to upload image to Cloudinary
// const uploadImageToCloudinary = async (image: any) => {
//     try {
//         console.log("AAAA")
//         // Upload image to Cloudinary
//         const result = await cloudinary.uploader.upload(image.path, { folder: 'BurgerBytes' });
//         // Return the URL of the uploaded image
//         console.log("BBBB")
//         return result.secure_url;
//     } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error);
//         throw error;
//     }
// };


// export async function PUT(req: any) {
//     try {
//         const {id, title, image, review, price, rating } = await req.json();

//         const db = await dbConnect();
//         console.log("update product",id, title, image, review, price, rating)

//         const items = await ProductModel.findOne({ _id: id });
//         console.log("2")
//         console.log(items)
//         // Check if user exists
//         if (!items) {
//             return NextResponse.json({ message: "Item not found." }, { status: 404 });
//         }
//         if (title !== undefined) items.title = title;
//         if (image !== undefined) items.image = image;
//         if (review !== undefined) items.review = review;
//         if (price !== undefined) items.price = price;
//         if (rating !== undefined) items.rating = rating;
//         console.log("4")


//         // Save the product to the database
//         await items.save();

//         return NextResponse.json({ message: "Product Update successfully." }, { status: 201 });

//     } catch (error) {
//         console.error("Error update product:", error);
//         return NextResponse.json(
//             { message: "An error occurred while update the product." },
//             { status: 500 }
//         );
//     }
// }


// export async function DELETE(req: any) {
//     try {
//         const { id } = await req.json(); 

//         const db = await dbConnect();
//         console.log("Deleting product with ID:", id);

//         // Find the product by its ID and delete it
//         const result = await ProductModel.deleteOne({ _id: id });

//         // Check if the product was found and deleted
//         if (result.deletedCount === 0) {
//             return NextResponse.json({ message: "Food not found." }, { status: 404 });
//         }

//         return NextResponse.json({ message: "Product deleted successfully." }, { status: 200 });

//     } catch (error) {
//         console.error("Error deleting product:", error);
//         return NextResponse.json(
//             { message: "An error occurred while deleting the product." },
//             { status: 500 }
//         );
//     }
// }




// export async function GET(req: any) {
//     try {
//         console.log("1")
//         const db = await dbConnect();
//         const products: Product[] = await ProductModel.find({});
//         console.log("2")
        
//         return NextResponse.json({ products }, { status: 200 });

//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return NextResponse.json(
//             { message: "An error occurred while fetching products." },
//             { status: 500 }
//         );
//     }
// }



import { uploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest)=>{

    const formdata = await req.formData();
    console.log("AAAA", formdata)

    const image = formdata.get('image') as unknown as File
    console.log("BBBB", image)

    const data = await uploadImage(image, "BurgerByte-Image")
    console.log("CCCC", { image })

    return NextResponse.json({ msg: data }, { status: 200 })

}