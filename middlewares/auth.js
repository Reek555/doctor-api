const jsonwebtoken  = require ('jsonwebtoken')


//middleware for decoding access token
const isLoggedin = (req, res, next) => {

    try {
        if (!req.headers.authorization) {
            return res.status(400).json ({
                message: 'access token not provided'
            })
        } 
        
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        req.currentUser = decoded
        next()
    }
    catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

module.exports = isLoggedin; 