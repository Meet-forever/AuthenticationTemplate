import { Router } from "express"
import { initializeApp } from "firebase/app"
import Validator from "./stateValidator.mjs"
import dotenv from "dotenv";
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



router.get('*', Validator);
router.get('/signin', (req, res) =>{
    res.render("signIn.ejs")
}) 
router.post('/signin', (req, res) =>{
    req.session.uid = { userID: "123"}
    res.send(JSON.stringify({
        status: "OK",
        sucess: "true"
    }))  
})
router.get('/signup', (req, res) =>{
    res.render("signUp.ejs")
})
router.post('/signup', (req, res) =>{
    res.send(JSON.stringify({
        status: "OK",
        sucess: "true"
    }))
})

export default router