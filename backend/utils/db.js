import mongoose from 'mongoose';
//const MONGO_URI = "mongodb://appUser:user123@localhost:27017/JOBPORTAL?authSource=JOBPORTAL";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}
export default connectDB;