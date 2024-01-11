const {DataTypes} = require('sequelize')

const db = require('../db/pool')

const User = db.define('User',{
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ocupation:{
        type: DataTypes.STRING,
        required: true,
    },
    newsLetter:{
        type:DataTypes.BOOLEAN,
    },
})

module.exports = User