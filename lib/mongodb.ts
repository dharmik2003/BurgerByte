// import mongoose, { ConnectOptions, Mongoose } from 'mongoose'
// const MONGODB_URI: any = 'mongodb://127.0.0.1:27017/BurgerByte'

// if (!MONGODB_URI) {
//     throw new Error(
//         'Please define the MONGODB_URI environment variable'
//     )
// }

// interface CachedConnection {
//     conn: Mongoose | null
//     promise: Promise<Mongoose> | null
// }


// let cached: CachedConnection = (global as any).mongoose

// if (!cached) {
//     cached = (global as any).mongoose = { conn: null, promise: null }
// }

// export default async function dbConnect(): Promise<Mongoose> {
//     if (cached.conn) {
//         console.log("Using cached connection");
//         return cached.conn
//     }

//     if (!cached.promise) {
//         console.log("Creating new connection");
//         cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => {
//             console.log("Database connected successfully")
//             return mongoose
//         })
//     }

//     console.log("Waiting for connection promise to resolve");
//     cached.conn = await cached.promise
//     return cached.conn
// }


import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string = process.env.DATABASE_URL || '';

console.log("MONGODB_URIMONGODB_URI", MONGODB_URI)

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

interface CachedConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: CachedConnection = { conn: null, promise: null };

export default async function dbConnect(): Promise<Mongoose> {
    if (cached.conn) {
        console.log("Using cached connection");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("Creating new connection");
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Additional options if needed
        } as any).then(mongoose => {
            console.log("Database connected successfully");
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
