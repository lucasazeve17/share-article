const express = require('express')
const app = express()
const routes = require('./routes')
const methodOverRide = require('method-override')
const connection = require('./database/database')
const session = require('express-session')

//database
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com sucesso')
    }).catch((err)=>{
        console.log(err)
    })


app.use(session({
    secret:'tiydaiydioa',
    cookie:{maxAge:28800000}
}))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverRide('_method'))
app.use(routes)

app.listen(8080,()=>{
    console.log('Server started')
})