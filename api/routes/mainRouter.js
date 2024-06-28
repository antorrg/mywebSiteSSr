import express from 'express'
import projectRouter from './projectRouter.js'
import userRouter from './userRouter.js'

const mainRouter = express.Router()

mainRouter.use('/api',projectRouter)

mainRouter.use('/api',userRouter)


export default mainRouter;