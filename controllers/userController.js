const bcrypt = require('bcrypt')
const models = require('../models')
const jsonwebtoken = require('jsonwebtoken');


exports.register = async (req, res) => {
    const {name, email, password, userType, latitude, longitude,  specialization, address, workingHours, phone} = req.body;
    try {
        const hashPassword = await bcrypt.hash (password, 10)
        const user = await models.User.create({
            name, 
            email,
            password: hashPassword, 
            userType, 
            latitude, 
            longitude
        })


        if (userType === 'doctor') {
            const profile = await models.Profile.create ({
                userId: user.id, 
                specialization, 
                address,
                workingHours, 
                phone
            })
        }

        console.log (user.toJSON())
        res.status(200).json({message: 'account created successfully'})

    }
    catch (e) {
        if (e.name){cl
            if (e.name = 'SequelizeUniqueConstraintError') {
                res.json({"error": "email already exist"})
            }
        }
        else {
            res.status(500).json()

        }

    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await models.User.findOne ({where: {email}})
        if (!user) {
            return res.status(401).json ({
                message: 'incorrect email or password!'
            })
        }
        const authSuccess = await bcrypt.compare(password, user.password)

        if (!authSuccess) {
            return res.status(401).json ({
                message: 'incorrect email or password!'
            })
        }

        const token = jsonwebtoken.sign({id: user.id, name: user.name, email: user.email}, process.env.JWT_SECRET)

        res.status(200).json ({
            accessToken: token
        })
    }
    catch(e) {
        res.status(500).json(e)

    }

}

exports.me = async (req, res) => {
    const user = await models.User.findByPk(req.currentUser.id)
    if (user != null) delete user.dataValues.password; 
    //console.log (user)
    res.json (user)
}

exports.profile = async (req, res) => {

    try {
        const result = await models.User.findOne({
            where: {id: req.currentUser.id},
            include:[{model: models.Profile, as: 'profile'}],
            attributes: {exclude: ['password']}
        }) 

        res.status(200).json(result)
    }
    catch (e) {
        res.status(500).json (e)

    }

}

exports.update = async (req, res) => {


    try {
      
        const user = await models.User.findByPk(req.currentUser.id)

        const userFields = ['name', 'email', 'passwords', 'userType', 'latitude', 'longitude']

        for (let f in req.body) {

            if (userFields.includes(f)) {
                if (f == 'password') {
                    user[f] = await bcrypt.hash (req.body.password, 10)
                    continue
                }
                user[f] = req.body[f]
            }
        }

        await user.save()



        const profile = await models.Profile.findOne({where: {userId: req.currentUser.id}})

        if (profile) {

            const profile = await models.Profile.findOne({where: {userId: req.currentUser.id}})

            const profileFields = ['phone', 'adress', 'specialization', 'workingHours']

            for (let f in req.body) {
    
                if (profileFields.includes(f)) {
                    profile[f] = req.body[f]
                }
    
            }

            await profile.save() 

        }


        res.status(200).json({msg: 'profile is updated.'})


    }
    catch (e) {
        console.log (e)
        res.status (500).json (e)
    }

}

exports.delete = async (req, res) => {

    try {    
        await models.User.destroy({
            where: {id: req.currentUser.id}
        })

        res.status(200).json({msg: 'account deleted'})


        }
    catch (e) {
        console.log(e)
        res.status(500).json(e)
    }

}