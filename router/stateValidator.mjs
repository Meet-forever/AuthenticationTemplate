import model from "../model/User.mjs" 
const Validator = (req, res, next) =>{
    if (req.session.user){

        const getuser = model.User.findOne({email: req.session.user.uid})
        if(getuser){    
            res.locals.user = getuser 
            next();
            return
        }
    }
    res.redirect('/');
    return
} 

export default Validator
