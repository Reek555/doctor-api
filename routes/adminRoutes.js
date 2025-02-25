const express = require ('express');
const router = express.Router();
const adminController = require ('../controllers/adminController')
const isAdmin = require ('../middlewares/admin')



router.get('/', (req, res) => {
    res.send('this is admin route')
})


router.post('/r', isAdmin, adminController.read)




module.exports = router; 