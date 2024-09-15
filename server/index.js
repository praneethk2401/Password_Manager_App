import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import accountsRoute from "./routes/accounts.js";
import decryptRoute from './routes/decrypt.js';


dotenv.config();
const DB_URI = process.env.DB_URI;
const app = express();
const PORT = process.env.PORT || 3001;

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB",error);
    }
};
connectToMongoDB();

app.use(express.json());
app.use("/api/accounts", decryptRoute);
//app.use(helmet());
//app.use(morgan("common"));

app.use("/api/auth",authRoute);
app.use("/api/accounts",accountsRoute);
app.get("/", (req,res) => {
    res.send("Hello World");
})

app.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}`);
});
