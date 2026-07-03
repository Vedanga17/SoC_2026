import mongoose from 'mongoose';


const DB_connector = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MONGODB Connection failed", error);
        process.exit(1);
    }
}

export default DB_connector;