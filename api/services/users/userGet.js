import {User} from '../../db.js'
import holderParser from './helpers/holderParser.js';



   export const getAllUsers = async ()=>{
        try{
            const holderFound = await User.findAll()
            if(!holderFound){const error = new Error('Unexpected error. User not found'); error.status= 500; throw error}
            if(holderFound.length===0){const error = new Error('User not found'); error.status= 404; throw error}
            return holderParser(holderFound, false)
        }catch(error){
            throw error
        }
    };
 export const getUsersById = async(id)=>{
        try {
            const holderFound = await User.findByPk(id)
            if(!holderFound){const error = new Error('Unexpected error. User not found'); error.status= 500; throw error}
            return holderParser(holderFound, true)
        } catch (error) {
            throw error
        }
    };
