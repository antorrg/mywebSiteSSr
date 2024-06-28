import express from 'express'
import ctr from '../controllers/homePageControllers/index.js'
import mid from "../middlewares/homeMiddlewares/index.js";


const pageRouter = express.Router()

pageRouter.post("/project/create",  mid.createMidd,ctr.createController);
pageRouter.post("/project/item/create",  mid.createItem, ctr.createItemController)
pageRouter.get("/project",  ctr.getPageHand);
pageRouter.get("/project/:id",  ctr.getPageById);
pageRouter.get("/project/item/:id", ctr.getItemById)
pageRouter.put("/project/:id", mid.updHome, ctr.updController);
pageRouter.patch("/project/:id", mid.createItem, ctr.detailUpdController);
pageRouter.delete("/project/:id", ctr.delController);



export default pageRouter;