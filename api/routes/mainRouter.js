import express from 'express'
import pageRouter from './pageRouter.js'
import userRouter from './userRouter.js'

const mainRouter = express.Router()

mainRouter.use('/api',pageRouter)

mainRouter.use('/api',userRouter)


export default mainRouter;