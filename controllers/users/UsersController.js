const User = require('../../models/User')
const Article = require('../../models/Article')


module.exports = {
    async profile(req, res) {
        const id =req.session.user.id
        const user = await User.findByPk(id,{
            include: [{ model: Article }]
        })

        return res.render('users/profile', { user, logado:true})
    },
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
        const id = req.session.user.id
        user = await User.findByPk(id,{
            include: [{ model: Article }]
        })
        return res.render('users/profileEdit', { logado: req.session.user == undefined ? false: true })
    },
    async update(req, res) {
        const { title, about } = req.body
        const user = await User.update({
            title,
            about
        }, {
            where: {
                id: req.session.user.id
            }
        })
        return res.redirect('/users/profile')
    }
    ,
    login(req, res) {
        return res.render('users/login', { logado: false })
    },
    async auth(req,res){
        const {email,password} = req.body

        const user = await User.findOne({where:{email}})
        if(user != undefined){
            if(user.password == password){
                req.session.user ={
                    id:user.id,
                    email:user.email
                }
                res.redirect('/users/profile')
            }else{
                res.send('Senha inválida')
            }
        }else{
            res.send('Email não cadastrado')
        }

    },
    logout(req,res){
        req.session.user = undefined
        res.redirect('/users/login')
    }
}