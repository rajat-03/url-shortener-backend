import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/index.js";
import urlRoutes from "./routes/index.js"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

dotenv.config();

const PORT = process.env.PORT || 5000;

connectToDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error in DB Connection", error);
    });


app.use("/url",urlRoutes)