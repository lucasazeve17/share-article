const User = require('../../models/User')
const Article = require('../../models/Article')



module.exports = {
    async create(req, res) {
        const { name, email, password, birth, sex } = req.body
        console.log(name)
        try {
            if (name != '' && email != '' && password != '' && birth != '' && sex != '') {
                const userEmail = await User.findOne({where:{
                    email
                }})
    
                if (!userEmail) {
                    User.create({
                        name,
                        email,
                        password,
                        birth,
                        sex
                    }).then(()=>{
                        return res.redirect('/users/login')
                    }).catch(err=>{
                        console.log(err)
                    })
                } else {
                    res.json({ error: 'Email ja utilizado' })
                }
            } else {
                res.send('Preencha todos os campos')
    
            }
            } catch (error) {
                console.log(error)
            }
            
    },
    new(req, res) {
        return res.render('users/create', { logado: false })
    },
    async edit(req, res) {
        user = await User.findOne({
            include: [{ model: Article }]
        }, { where: { id: 1 } })
        return res.render('users/profileEdit', { logado: false })
    },
    async update(req, res) {
        const { title, about } = req.body
        const user = await User.update({
            title,
            about
        }, {
            where: {
                id: 1
            }
        })
        return res.redirect('/users/profile')
    }
    ,
    login(req, res) {
        return res.render('users/login', { logado: false })
    },
    async profile(req, res) {
        const user = await User.findOne({
            include: [{ model: Article }]
        }, { where: { id: 1 } })

        return res.render('users/profile', { user, logado: true })
    }
}