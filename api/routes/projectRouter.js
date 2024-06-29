import express from "express";
import ctr from "../controllers/projectControllers.js";
import mid from "../middlewares/middlewares.js";

const projectRouter = express.Router();

projectRouter.post("/project/create", mid.createMidd, ctr.createController);
projectRouter.post("/project/item/create",mid.createItem,ctr.createItemController);
projectRouter.get("/project", ctr.getProjectHand);
projectRouter.get("/project/:id", mid.protectRoute, ctr.getProjectById);
projectRouter.get("/project/item/:id", mid.protectRoute, ctr.getItemById);
projectRouter.put("/project/:id", mid.updHome, ctr.updController);
projectRouter.patch("/project/:id", mid.createItem, ctr.detailUpdController);
projectRouter.delete("/project/:id", mid.protectRoute, ctr.delController);

export default projectRouter;
