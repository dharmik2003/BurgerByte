// // Import the necessary modules
// import mongoose from "mongoose";

// // Define the Order schema
// const OrderSchemaModel = new mongoose.Schema(
//   {
//     userId: String,
//     productId: String,
//     orderId: String,
//     name: String,
//     image: String,
//     price: Number,
//     quantity: Number,
//     payment: Boolean,
//     paymentID: String,
//     orderstatus: {
//       type: Boolean,
//       default: false,
//     },
//     rejectorder: {
//       type: Boolean,
//       default: false,
//     },
//     dispatchorder: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// // Create the Order model (ensure it uses the correct collection name "Order")
// const OrderSchema = mongoose.models.Order || mongoose.model("Order", OrderSchemaModel);

// // Export the Order model
// export default OrderSchema;

import mongoose from "mongoose";
import { ObjectId } from "mongodb";


// Define the Order schema
const OrderSchemaModel = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    productId: String,
    orderId: String,
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    payment: Boolean,
    paymentID: String,
    orderstatus: {
      type: Boolean,
      default: false, 
    },
    rejectorder: {
      type: Boolean,
      default: false, 
    },
    dispatchorder: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);


// Create the Order model (ensure it uses the correct collection name "Order")
const OrderSchema =
  mongoose.models.Order || mongoose.model("Order", OrderSchemaModel);

// Export the Order model
export default OrderSchema;
