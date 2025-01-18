import { Router } from "express";
import userRouter from "./user/user.routes";

const combinedRouter: Router[] = [
  userRouter
];

export default combinedRouter;