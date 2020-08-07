const express = require('express')
const routes = express.Router()
const UsersController = require('./controllers/users/UsersController')
const ArticlesController = require('./controllers/articles/ArticlesController')
const Category = require('./models/Category')



routes.get('/',(req,res)=>{

    res.render('index',{logado:false})
})


//articles
routes.get('/articles',ArticlesController.index)
routes.get('/users/articles/edit/:id',ArticlesController.edit)
routes.get('/users/articles/new',ArticlesController.new)
routes.post('/articles/create',ArticlesController.create)
routes.put('/articles/update',ArticlesController.update)
routes.delete('/articles/delete',ArticlesController.destroy)

//users
routes.get('/users/register',UsersController.new)
routes.get('/users/login',UsersController.login)
routes.get('/users/profile',UsersController.profile)
routes.get('/users/profile/edit',UsersController.edit)
routes.put('/users/profile/edit',UsersController.update)
routes.post('/users/create',UsersController.create)



module.exports = routes