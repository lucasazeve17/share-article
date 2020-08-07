const Sequelize = require('sequelize')
const connection = require('../database/database')
const User = require('./User');
const Category = require('./Category');
const Article = connection.define('articles',{

    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    slug:{
        type:Sequelize.STRING,
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    likes:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    coverImage:{
        type:Sequelize.STRING,
    }
})


User.hasMany(Article,{
    foreingKey:'userId'
});
Article.belongsTo(User);

Category.hasMany(Article,{
    foreingKey:'categoryId'
})
Article.belongsTo(Category)



module.exports = Article