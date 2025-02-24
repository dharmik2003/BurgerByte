// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     otp: Number,
//     isverified: Boolean 
// },
// { timestamps: true }
// );


// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    otp: Number,
    address: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    forgototp:Number,
    image:String,
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     otp: Number,
//     isVerified: { type: Boolean, default: false } // New field to track user verification status
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;
