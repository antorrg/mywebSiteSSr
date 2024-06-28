import sv from '../../services/users/index.js'

const createUserCtr = async (req, res) => {
    const {email, password}= req.body;
    const response = await sv.userCreate(email, password)
    res.status(201).json(response)
}

export default createUserCtr
