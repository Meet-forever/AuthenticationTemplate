import express from "express"; 
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { renderFile } from "ejs"
import authenticate from "./router/authentication.mjs"
import securedUser from "./router/secure.mjs"
import sessions from "express-session";
import {randomBytes} from "node:crypto";
import MongoStore from "connect-mongo";



// Initialization
const app = express();
const {
    PORT = 8000
} = process.env;
const __dirname = dirname(fileURLToPath(import.meta.url));



// --- Paths and Middlewares setup
app.engine('ejs', renderFile);
app.use('/public', express.static(join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs')   // Using EJS as a template engine
app.set('views', join(__dirname, 'views')) // Setting views folder path 




// -- Session Set Up
app.use(sessions({
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI,
        collectionName: 'sessions'
    }),
    secret: randomBytes(36).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie : { 
        maxAge: 60 * 1 * 1000,
        httpOnly: true
    }
}))



// Methods and Routes
app.get('/', (req, res) =>{
    res.render('index.ejs');
})
app.use('/auth', authenticate)
app.use('/user', securedUser)



app.listen(PORT, ()=>console.log(`Listening on PORT: ${PORT}`));