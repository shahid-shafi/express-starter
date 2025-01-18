import express, { Request, Response } from 'express';
const userRouter = express.Router();

userRouter.route('/').get((request: Request, response: Response) => {
  response.json({ message: "Hello from server" })
})

export default userRouter;