import {Router} from 'express'
import Validator from './stateValidator.mjs';
const router = Router()

router.all('*', Validator)
router.get('/profile', (req, res) => {
    res.render('profile')
})

router.get('/signout', (req, res) =>{
    req.session.destroy();
    res.redirect('/')
})

export default router;