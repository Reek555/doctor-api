const isAdmin = (req, res, next) => {

    try {
        if ( req.body.password !== process.env.ADMIN_PASS) {
            return res.status(200).json({message: 'admin access denied'})
        }

        next()

    }
    catch (e) {
        res.status(500).json (e)
    }
}

module.exports = isAdmin; 