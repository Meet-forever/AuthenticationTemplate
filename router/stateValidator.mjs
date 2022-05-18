const Validator = (req, res, next) =>{
    console.log("Validate");
    next();
} 

export default Validator
