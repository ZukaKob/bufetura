const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const express_limiter = require('express-rate-limit')

require('dotenv').config()

const app = express() 

const Refresh_Limit = express_limiter({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: "Too mani API request, try again after 15 minutes"
})

app.use(Refresh_Limit) 
app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/v1', require('./routes/auth_routes'))
app.use('/api/v1/admin', require('./routes/admin_routes')) 
app.use('/api/v1/administrator', require('./routes/administrator_routes')) 
app.use('/api/v1/user', require('./routes/user_routes'))
app.use(require('./routes/error_routes')) 

mongoose    
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Database set, server started on port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {throw err})

