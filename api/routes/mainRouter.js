import express from 'express'

import ctr from "../controllers/projectControllers.js";
import mid from "../middlewares/middlewares.js";

const mainRouter = express.Router()


mainRouter.post("/project/create", mid.createMidd, ctr.createController);
mainRouter.post("/project/item/create",mid.createItem,ctr.createItemController);
mainRouter.get("/project", ctr.getProjectHand);
mainRouter.get("/project/:id", mid.protectRoute, ctr.getProjectById);
mainRouter.get("/project/item/:id", mid.protectRoute, ctr.getItemById);
mainRouter.put("/project/:id", mid.updHome, ctr.updController);
mainRouter.patch("/project/:id", mid.createItem, ctr.detailUpdController);
mainRouter.delete("/project/:id", mid.protectRoute, ctr.delController);
//--------------------------------------------------------------------------
mainRouter.post("/user/create", mid.createHolderMidd, ctr.createUserCtr);
mainRouter.post("/user/login", mid.createHolderMidd, ctr.loginUserCtr);
mainRouter.post("/user/sec", mid.verifyToken, ctr.verifyPassCtr);
mainRouter.get("/user", mid.verifyToken, ctr.getUserCtr);
mainRouter.get("/user/:id", mid.verifyToken, ctr.getDetailCtr);
mainRouter.put("/user/:id", mid.verifyToken, mid.updHolderMidd, ctr.updUserCtr);
mainRouter.patch("/user/sec/:id", mid.verifyToken, ctr.changePassCtr);
mainRouter.delete("/user/:id", mid.verifyToken, ctr.delUserCtr);


export default mainRouter;