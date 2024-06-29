import express from "express";
import h from "../controllers/userControllers.js";
import midd from '../middlewares/middlewares.js'

const userRouter = express.Router();

userRouter.post("/user/create", midd.createHolderMidd, h.createUserCtr);
userRouter.post("/user/login", midd.createHolderMidd, h.loginUserCtr);
userRouter.post("/user/sec", midd.verifyToken, h.verifyPassCtr);
userRouter.get("/user", midd.verifyToken, h.getUserCtr);
userRouter.get("/user/:id", midd.verifyToken, h.getDetailCtr);
userRouter.put("/user/:id", midd.verifyToken, midd.updHolderMidd, h.updUserCtr);
userRouter.patch("/user/sec/:id", midd.verifyToken, h.changePassCtr);
userRouter.delete("/user/:id", midd.verifyToken, h.delUserCtr);

export default userRouter;
