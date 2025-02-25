const models = require('../models')



exports.read = async (req, res) => {

    try {
        const users = await models.User.findAll()
        res.status(200).json(users)

    }
    catch (e) {
        res.status(500).json({error: e})
    } 

    
}