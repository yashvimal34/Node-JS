import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected succesfully")
    } catch (err) {
        console.log("Error in DB Connection");
        console.error(err.message);
        process.exit(1);
    }
}