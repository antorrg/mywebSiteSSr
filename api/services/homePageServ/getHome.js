import { Page, Item} from '../../db.js'
import {homeCleaner, aux} from './helpers/homeCleaner.js'
import dataEmptyPage from '../../utils/dataEmpty/dataEmpty.js'

const getHome = async () => {
    try {
        const dataFound = await Page.findAll({
             include :[
                {
                model: Item,
                attributes:['id', 'img', 'text', 'PageId'],
           },
        ],
        })
        if(!dataFound){const error = new Error('Dato no hallado'); error.status = 404; throw error;}
        if(dataFound.length === 0)return dataEmptyPage()
        const data = homeCleaner(dataFound, false)
        return data
      
    } catch (error) {
        throw error;
    }
    
}
const getById = async (id) => {
    try {
        const data = await Page.findByPk(id,{
            where:{
                deleteAt:false,
            },
                include : [ 
                    {
                    model: Item,
                    attributes: ['id', 'img', 'text', 'PageId'],
                }
            ]
        })
        if(!data){const error = new Error('Dato no hallado'); error.status = 404; throw error;}
        const dataFound = homeCleaner(data, true)
        return dataFound
    } catch (error) {
        throw error;
    }
}
const getDetail = async (id) => {
    try {
        const itemFound = await Item.findByPk(id,{
            where: {enable:true,}
        });
        if(!itemFound){const error = new Error('Dato no hallado'); error.status = 404; throw error;}
        const item = aux(itemFound, true)
        return item;
    } catch (error) {
        throw error;
    }
}

export {
    getHome,
    getById,
    getDetail,
}