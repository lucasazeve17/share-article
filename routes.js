const express = require('express')
const routes = express.Router()
const userAuth = require('./middlewares/Auth')
const UsersController = require('./controllers/users/UsersController')
const ArticlesController = require('./controllers/articles/ArticlesController')
const Category = require('./models/Category')



routes.get('/',(req,res)=>{

    res.render('index',{logado:req.session.user == undefined ? false:true})
})


//articles
routes.get('/articles',ArticlesController.index)
routes.get('/articles/:id',ArticlesController.show)
routes.get('/users/articles/edit/:id',userAuth,ArticlesController.edit)
routes.get('/users/articles/new',userAuth,ArticlesController.new)
routes.post('/articles/create',ArticlesController.create)
routes.put('/articles/update',userAuth,ArticlesController.update)
routes.delete('/articles/delete',userAuth,ArticlesController.destroy)

//users
routes.get('/users/register',UsersController.new)
routes.get('/users/login',UsersController.login)
routes.get('/users/profile',userAuth,UsersController.profile)
routes.get('/users/profile/edit',userAuth,UsersController.edit)
routes.put('/users/profile/edit',userAuth,UsersController.update)
routes.post('/users/create',UsersController.create)

routes.post('/users/auth',UsersController.auth)
routes.get('/users/logout',UsersController.logout)

module.exports = routes