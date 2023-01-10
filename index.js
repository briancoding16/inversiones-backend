const express = require('express')
const app = express()  
const port = 3000
const Users = require('./models/users')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



///Conexion a base de datos
mongoose.connect(`mongodb+srv://dev_backend:${process.env.MONGOOSE_KEY}@development.wnd33f3.mongodb.net/test`, (err, res)=>{
    if (err) {throw err}

    console.log('Connected to MongoDB Database')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.post('/api/v1/users', (req, res) => {
    let body = req.body
    let users = new Users({
        name: body.name,
        email: body.email,
        password: body.password,
    })
    console.log({users})

    users.save((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        res.json({
            ok: true,
            data: data
        })
    })
})









app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
})