import { Router } from "express"
import dotenv from "dotenv";
import model from "../model/User.mjs"
import hashGenerator, { isValid } from "../util/generator.mjs"
import { initializeApp } from "firebase/app"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, } from "firebase/auth"
dotenv.config()


const router = Router()
const firebaseapp = initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID ,
    appId: process.env.APP_ID,
})
const auth = getAuth(firebaseapp)


const Validator = (req, res, next) =>{
    if(req.session.user){
        res.redirect('/user/profile');
        return;
    }
    next();
}

router.get('*', Validator);
router.get('/signup', (req, res) =>{
    res.render('signUp.ejs');
})
router.post('/signup', (req, res) =>{
    const [hpass, salt] = hashGenerator(req.body.password);
    const newuser = new model.User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hpass,
        hash: 'sha512',
        salt: salt,
    })
    newuser.save(err =>{
        if(err){
            res.render('signUp.ejs', {errorMessage: "SomeError occured"})
            return;
        }
        else{
            req.session.user = {uid: req.body.email}
            res.redirect('/user/profile');     
        }
    })
})
router.get('/signin', (req, res) =>{
    res.render("signIn.ejs")
}) 
router.post('/signin', async(req, res) =>{
    const getuser = await model.User.findOne({email: req.body.email});
    if (getuser){
        if(isValid(req.body.password, getuser.password, getuser.salt)){
            req.session.user = { uid: req.body.email}
            res.redirect('/user/profile')
        }
        else{
            res.render("signIn.ejs", {errorMessage: "Incorrect password"})
        }
    }
    else{
        res.render("signIn.ejs", {errorMessage: "Account doesn't exists!"})
    }
})

export default router