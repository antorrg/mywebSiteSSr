
export default{
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
};