import {User} from '../../db.js'


export default async function userDel (id) {
    try{
    	const user = await User.findByPk(id)
		if(!user){const error = new Error('User not found'); error.status = 404; throw error};
		await user.destroy(id)
		return {message: 'User deleted succesfully'};
    }catch(error){
    	throw error;
    }
}