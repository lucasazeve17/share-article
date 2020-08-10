const Article = require('../../models/Article')
const slugify = require('slugify')
const Category = require('../../models/Category')
const User = require('../../models/User')


module.exports = {
    async new(req, res) {
        const categories = await Category.findAll()

        res.render('articles/createArticle', { categories: categories, logado: true })
    },
    async edit(req, res) {
        const { id } = req.params
        console.log(id)
        const article = await Article.findByPk(id,{ include: [{ model: Category }] })
        const categories = await Category.findAll()
        res.render('articles/editArticle', { logado: true, article, categories })
    }
    ,
    async index(req, res) {
        try {
            const articles = await Article.findAll({
                include: [{ model: Category },{model:User}], order: [
                    ['id', 'DESC']
                ]
            })

            return res.render('articles', { articles, logado: req.session.user == undefined?false:true  })
        } catch (error) {
            console.log(err)
        }
    },
    async show(req,res){
        const {id} = req.params


        const article = await Article.findByPk(id,{include:[{model:User}]})
        console.log('adw'+id+article)
        return res.render('articles/showArticle',{article,logado:req.session.user != undefined ? true:false})
    },
    async create(req, res) {
        const { title, body, category, coverImage } = req.body
        console.log(title, body, category, coverImage)
        if (title !== '' && body !== '' && category !== '') {
            const userId = req.session.user.id
            try {
                const article = await Article.create({
                    title,
                    slug: slugify(title),
                    body,
                    coverImage,
                    likes: 0,
                    userId: userId,
                    categoryId: category
                })


                return res.redirect('/users/profile')

            } catch (error) {
                console.log(error)
            }
        } else {
            res.redirect('/users/articles/new')
        }
    },
    async update(req, res) {
        const { title, body, category, id } = req.body

        try {
            const article = await Article.update({
                title,
                slug: slugify(title),
                body,

                categoryId: category
            }, {
                where: {
                    id: id
                }
            })
            return res.json({ article })
        } catch (error) {
            console.log(error)
        }

    },
    destroy(req, res) {
        const { id } = req.body
        try {
            Article.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}