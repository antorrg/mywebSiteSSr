import eh from '../../utils/errors/index.js'
import {createController, createItemController} from './createController.js'
import delController from './delController.js'
import {updController, detailUpdController} from './updController.js'
import {getProjectHand, getProjectById, getItemById} from './getPageController.js'


export default {
    
    createController : eh.catchAsync(createController),
    createItemController : eh.catchAsync(createItemController),
    delController : eh.catchAsync(delController),
    updController : eh.catchAsync(updController),
    detailUpdController: eh.catchAsync(detailUpdController),
    getProjectHand : eh.catchAsync(getProjectHand), 
    getProjectById : eh.catchAsync(getProjectById),
    getItemById : eh.catchAsync(getItemById),

};