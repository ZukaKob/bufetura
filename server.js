const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express() 

app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/v1', require('./routes/auth_routes'))
app.use(require('./routes/admin_routes')) 
app.use('/api/v1/administrator', require('./routes/administrator_routes')) 
app.use('/api/v1/user', require('./routes/user_routes'))

mongoose    
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Database set, server started on port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {throw err})

