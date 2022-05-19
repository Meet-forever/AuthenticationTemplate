import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectionOption = {

}

const connection = mongoose.connect(process.env.DB_URI, connectionOption);

export default connection;