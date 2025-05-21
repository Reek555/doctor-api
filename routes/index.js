const express = require ('express');
const router = express.Router();
const userController = require('../controllers/userController')
const doctorController = require('../controllers/doctorController')
const adminController = require ('../controllers/adminController')
const {userValidationRules, validate} = require('../middlewares/validator')
const isLoggedin = require('../middlewares/auth')
const isAdmin = require ('../middlewares/admin')
const adminRouter = require('./adminRoutes')


router.get('/home',  (req, res) => {

    res.json({message: 'welcome home.'})


})



router.post('/account/register', userValidationRules(), validate, userController.register)
router.post('/account/login', userController.login)


router.get('/account/me', isLoggedin, userController.me)
router.get('/account/profile', isLoggedin, userController.profile)
router.put('/account/update', isLoggedin, userValidationRules(), validate,  userController.update)
router.delete('/account/delete', isLoggedin,  userController.delete)
router.get('/doctors', isLoggedin, doctorController.index)

router.use('/admin', adminRouter)


module.exports = router; 