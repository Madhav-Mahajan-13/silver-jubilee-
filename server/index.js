import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import db from "./dbConnection.js";
import userRouter from "./Route/userRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
