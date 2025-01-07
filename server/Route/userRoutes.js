import express from "express";
import { submit } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/submit", submit);


export default userRouter;