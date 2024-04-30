// import mongoose, { ConnectOptions, Mongoose } from 'mongoose'
const MONGODB_URI: any = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable'
    )
}

interface CachedConnection {
    // conn: Mongoose | null
    // promise: Promise<Mongoose> | null
}


let cached: CachedConnection = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

// export default async function dbConnect(): Promise<Mongoose> {
    // if (cached.conn) {
    //     return cached.conn
    // }

    // if (!cached.promise) {
    //     cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => {
    //         return mongoose
    //     })
    // }

//     cached.conn = await cached.promise
//     return cached.conn
// }