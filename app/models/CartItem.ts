// Import the necessary modules
import mongoose from 'mongoose';

// Define the CartItem schema
const CartItemSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    orderId: String,
    name: String,
    image:String,
    price: Number,
    quantity: Number,
    payment:Boolean,
    paymentID:String,
    orderstatus:Boolean,
    rejectorder:Boolean,
    dispatchorder:Boolean
    
},{ timestamps: true });

// Create the CartItem model
const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);

// Export the CartItem model
export default CartItem;
