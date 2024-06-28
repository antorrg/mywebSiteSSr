import express from 'express'
import h from "../controllers/userControllers/index.js";
import midd from "../middlewares/holderMiddlewares/index.js";
import jw from '../middlewares/holderMiddlewares/secureMidd/jwtValid.js'

const userRouter = express.Router()

userRouter.post("/user/create",  midd.createHolderMidd, h.createUserCtr)
userRouter.post("/user/login",  midd.createHolderMidd, h.loginUserCtr)
userRouter.post("/user/sec", jw.verifyToken, h.verifyPassCtr)
userRouter.get("/user", jw.verifyToken, h.getUserCtr);
userRouter.get("/user/:id", jw.verifyToken, h.getDetailCtr);
userRouter.put("/user/:id", jw.verifyToken, midd.updHolderMidd, h.updUserCtr)
userRouter.patch("/user/sec/:id",jw.verifyToken, h.changePassCtr)
userRouter.delete("/user/:id", jw.verifyToken, h.delUserCtr)

export default userRouter;