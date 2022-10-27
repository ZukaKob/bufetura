const express = require('express') 
const mongoose = require('mongoose') 
require('dotenv').config()

const app = express() 

app.use(express.json())
app.use(express.urlencoded({extended:true})) 

app.use('/api/v1', require('./routes/auth_routes'))
app.use(require('./routes/admin_routes')) 

mongoose    
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Database set, server started on port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {throw err})

