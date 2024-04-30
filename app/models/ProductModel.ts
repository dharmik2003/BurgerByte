// import mongoose, { Schema, Document } from 'mongoose';

// // Define the schema for the order
// export interface Product extends Document {
//     title: string;
//     image: string;
//     review: string;
//     price: number;
//     rating: number;
// }

// const ProductSchema: Schema = new Schema({
//     title: { type: String, required: true },
//     image: { type: String, required: true },
//     review: { type: String, required: true },
//     price: { type: Number, required: true },
//     rating: { type: Number, required: true }
// }, {
//     timestamps: true 
// });

// // Create the model for the order
// const ProductModel = mongoose.model<Product>('Product', ProductSchema);

// export default ProductModel;


import mongoose from "mongoose";


export interface Product {
    title: string;
    image: string;
    review: string;
    price: number;
    rating: number;
}

const ProductSchema = new mongoose.Schema({
    title: String,
    image: String,
    review: Number,
    price: Number,
    rating: Number
}, { timestamps: true });


const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;