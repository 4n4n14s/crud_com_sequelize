const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/pool')
const User = require("./model/User")
const Address = require('./model/Address')
const { where } = require('sequelize')
const app = express()

app.use(express.urlencoded(
    {
        extended: true
    }
))

app.use(express.json())

app.use(express.static('public'))
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.get('/users/create',(req,res)=>{
    res.render('adduser')
})

app.post('/users/create',async (req,res)=>{
    const name = req.body.name
    const ocupation = req.body.ocupation
    let newsLetter = req.body.newsletter

    if (newsLetter === 'on'){
        newsLetter = true
    }else{
        newsLetter = false
    }

    await User.create({name,ocupation,newsLetter})

    res.redirect('/')

})
app.get('/users/:id', async (req,res)=>{

    const id = req.params.id
    const user = await User.findOne({raw:true ,where:{id,id}})


    res.render('userview', {user})

})

app.post('/users/delete/:id', async(req,res)=>{
    const id = req.params.id

    const user = await User.destroy({where: {id:id}})

    res.redirect('/')

    
})

app.get('/users/edit/:id', async (req,res)=>{
    const id = req.params.id
    try {
        const user = await User.findOne({include: Address, where:{id:id}})
        res.render('useredit',{users: user.get({plain:true})})
    } catch (error) {
        console.log(error)
        
    }
    
})

app.post('/users/update', async(req,res)=>{
    const id  = req.body.id
    const name = req.body.name
    let newsLetter = req.body.newsLetter
    const ocupation = req.body.ocupation

    if (newsLetter === 'on') {
        newsLetter = true
        
    } else {
        newsLetter = false
        
    }

    const userData = {
        id,
        name,
        ocupation,
        newsLetter
    }

    await User.update(userData, {where:{id:id}})




    res.redirect('/')

})

app.post('/address/create', async (req,res)=>{
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {
        UserId,
        street,
        number,
        city
    }
    await Address.create(address)

    res.redirect(`/users/edit/${UserId}`)

})
app.post('/address/delete', async (req,res)=>{
    const id = req.body.id
    const UserId = req.body.UserId

    await Address.destroy({where:{id:id}})

    res.redirect(`/users/edit/${UserId}`)
})

app.get('/', async (req,res)=>{

    const user = await User.findAll({
        raw: true
    })
    


    res.render('home', {users: user})
})




conn
.sync()
//.sync({force: true})
.then(()=>{

    app.listen(3000,()=>{
        console.log('app rodando na porta 3000')
    })
}).catch((err)=>console.log(err))
