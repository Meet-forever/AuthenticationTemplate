import model from "../model/User.mjs" 
const Validator = (req, res, next) =>{
    if (req.session.user){
        const getuser = model.User.findOne({email: req.body.user.email})
        if(getuser){
            res.locals.user = getuser 
            next();
        }
    }
    res.redirect('/');
    return
} 

export default Validator
