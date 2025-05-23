const {Sequelize} = require('sequelize')
const db = require ('./database')


const User = db.define ('user', {
    name: {
        type: Sequelize.DataTypes.STRING, 
    }, 
    email: {
        type: Sequelize.DataTypes.STRING,
        unique: true
    }, 
    password: {
        type: Sequelize.DataTypes.STRING, 
    }, 
    userType: {
        type: Sequelize.DataTypes.ENUM('normal', 'doctor')
    }, 
    latitude: {
        type: Sequelize.DataTypes.FLOAT, 
    }, 
    longitude: {
        type: Sequelize.DataTypes.STRING, 
    }
})


User.associate = (models) => {
    User.hasOne(models.Profile)
}


module.exports = User;