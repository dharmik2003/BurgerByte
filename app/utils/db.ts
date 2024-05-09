import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    console.log("1")
    mongoose.set('strictQuery', true)
    console.log("1")
    if (isConnected) {
        console.log("1")
        console.log("Mongo is already connected")
        return
    }
    console.log("1")
    try {
        console.log("2")
        await mongoose.connect('mongodb://localhost:27017/BurgerByte')
        console.log("121")
        isConnected = true
        console.log("connected to mongodb")
        console.log("2")
    }
    catch (e) {
        console.log(e)
    }
}