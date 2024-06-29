import pkg from 'jsonwebtoken'
import env from '../envConfig.js'
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export default {
 verifyToken : (req, res, next)=>{
 let token = req.headers['x-access-token'] || req.headers.authorization;

    if(!token){ return res.status(401).json({error: 'Acceso no autorizado. Token no proporcionado'})}
    if (token.startsWith('Bearer ')) {
        // Eliminar el prefijo 'Bearer ' del token
        token = token.slice(7, token.length);
    }

    pkg.verify(token, env.SecretKey, (err, decoded)=>{
        if(err){
            if(err.name === 'TokenExpiredError'){return res.status(401).json({error: 'Token expirado'})
            }return res.status(401).json({error: 'Token invalido'})
        }
        req.user = decoded;
        const userId = decoded._id;
        const userRole= decoded.role;
        req.userInfo = {userId, userRole}
        //console.log('userInfo: ', req.user.userId, )
        //console.log('soy role : ', req.user.role)
        next();
    })

},

generateToken : (user)=>{
    
    const token = pkg.sign({userId: user._id, email:user.email, role:user.role}, env.SecretKey, {expiresIn: '5h'});
    return token;

},

createHolderMidd : async (req, res, next)=>{
    const{email, password}= req.body;
    // Validar si existe el email y su formato usando una expresión regular
    if(!email){return res.status(400).json({error: "missing email"})};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {return res.status(400).json({ error: "invalid email format" });}
    if(!password){return res.status(400).json({error: "missing password"})};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "invalid password format. Pass musk contain at least 8 char and 1 cap.letter"});}
    next()},

updHolderMidd : (req, res, next) => {
    try {
    const { id } = req.params; const newData = req.body;
    // Validar que el ID esté presente
    if (!id) { return res.status(400).json({ error: 'Missing id' })}
    // Validar que el ID sea un UUID v4 válido
    if (!uuidValidate(id) || uuidVersion(id) !== 4) {return res.status(400).json({ error: 'Invalid id' })}
    // Validar que el cuerpo de la solicitud esté presente y no vacío
    if (!newData || Object.keys(newData).length === 0) {return res.status(400).json({ error: 'Missing body' })}

    // Puedes agregar validaciones adicionales para los campos esperados en newData
    const requiredFields = ['email', 'given_name', 'picture', 'country', 'role', 'enable'];
    const missingFields = requiredFields.filter(field => !(field in newData));
    if (missingFields.length > 0) {return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` })}
    next();
    } catch (error) {return res.status(500).json({ error: 'Internal server error' })}
},
createItem : (req, res, next) => {
    const {img, text, id } = req.body;
    if(!img){return res.status(400).json({error: 'missing parameter'})}
    if(!text){return res.status(400).json({error: 'missing parameter'})}
    if(!id){return res.status(400).json({error: 'missing parameter'})}
    next()},

createMidd : (req, res, next) => {
    const {title, landing,logo, info_header, info_body, url, items } = req.body;
    if(!title){return res.status(400).json({error: 'missing parameter'})}
    if(!landing){return res.status(400).json({error: 'missing parameter'})}
    if(!logo){return res.status(400).json({error: 'missing parameter'})}
    if(!info_header){return res.status(400).json({error: 'missing parameter'})}
    if(!info_body){return res.status(400).json({error: 'missing parameter'})}
    if(!url){return res.status(400).json({error: 'missing parameter'})}
    if(!items){return res.status(400).json({error: 'missing parameter'})}
    if(items.length ===0){return res.status(400).json({error: 'missing parameter'})}
    next();
},
protectParam : (req, res, next) => {
    const {id} = req.params;
    const idIsNumber = !isNaN(id) && Number.isInteger(parseFloat(id));
    if (id && !idIsNumber) {
    return res.status(400).render('error', { message: 'Parámetros no permitidos', status: 400 })}
    next()},

protectRoute : (req, res, next) => {
    const unexpectedParams = Object.keys(req.body).length > 0;
    // Verifica que 'id' en la query sea un número si está presente
    const id = req.query.id;
    const idIsNumber = !isNaN(id) && Number.isInteger(parseFloat(id))
    if (unexpectedParams || (id && !idIsNumber)) {
    return res.status(400).render('error', { message: 'Parámetros no permitidos', status: 400 })}
    next()},
updHome: (req, res, next)=>{
    const {title, landing, logo, info_header, info_body, url } = req.body;

    if(!title){return res.status(400).json({error: 'missing parameter'})}
    if(!landing){return res.status(400).json({error: 'missing parameter'})}
    if(!logo){return res.status(400).json({error: 'missing parameter'})}
    if(!info_header){return res.status(400).json({error: 'missing parameter'})}
    if(!info_body){return res.status(400).json({error: 'missing parameter'})}
    if(!url){return res.status(400).json({error: 'missing parameter'})}
    
    next();
},
catchAsync : (controller)=>{
    return (req, res, next)=>{
        return controller(req, res, next).catch(next);
    }
},

errorEndWare :(err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || 'Server error';
    console.error(message)
    res.status(status).json(message)
},
lostRoute :(req, res, next)=> {
    res.status(404).json({ error: 'Not Found' })},

validJson : (err, req, res, next)=>{
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        res.status(400).json({error: 'Invalid JSON format'});
    }else{next()};
},
    
}