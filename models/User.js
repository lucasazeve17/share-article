const Sequelize = require('sequelize')
const connection = require('../database/database');

const User = connection.define('users',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    birth:{
        type:Sequelize.STRING,
        allowNull:false
    },
    sex:{
        type:Sequelize.STRING,
        allowNull:false
    },
    avatar:{
        type:Sequelize.STRING
    },
    title:{
        type:Sequelize.STRING
    },
    likesArticle:{
        type:Sequelize.TEXT
    }
    ,
    about:{
        type:Sequelize.STRING
    }
})



module.exports = User