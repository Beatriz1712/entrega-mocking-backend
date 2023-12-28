import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

mongoose.set('strictQuery', false); //Para que no de error deprecated al buscar por query


const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
         console.log("\u001b[1;35mConnection successful Database"); 
        
    } catch (error) {
        console.error("\u001b[1;31m Connection failed " + error, error);
        process.exit();
    }
}

export default connectMongo;

