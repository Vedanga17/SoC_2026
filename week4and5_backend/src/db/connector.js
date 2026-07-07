import mongoose from 'mongoose';

const DB_connector = async () => { // need to write an async function as db connection takes time
    try { // wrapping in try-catch to handle errors better
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`); // storing in object
        console.log("MongoDB connected successfully"); // print success message
    } catch (error) {
        console.error("MongoDB Connection failed", error); // if error, print error message and also what error has occured.
        process.exit(1); // exit the process
    }
}

export {DB_connector}; // export for further use in index.js