import {User} from '../../db.js'
import bcrypt from 'bcrypt'
import jwt from '../../middlewares/holderMiddlewares/secureMidd/jwtValid.js'
import holderParser from './helpers/holderParser.js';


export default async function userLog (email1, password1) {
    try {
        const hold = await User.findOne({
            where: {
                email: email1,
            }
        });
    if(!hold || hold === undefined){const error = new Error('This user do not exists!'); error.status = 400; throw error;}
    //verificacion de password:
    const passwordMatch = await bcrypt.compare(password1, hold.password)
    if(!passwordMatch){const error = new Error('Invalid Password!'); error.status = 400; throw error;}
    //formacion del token y retorno del usuario.
    
    return {user: holderParser(hold, true),
            token: jwt.generateToken(hold),
            }
    } catch (error) {
        throw error;
    }
}