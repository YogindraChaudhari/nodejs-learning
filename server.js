const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const passport = require('./auth')



const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.PORT || 3000


// Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`)
    next() //Move on to the next phase
}

app.use(logRequest)


app.use(passport.initialize())

// app.get('/', logRequest, function(req, res){

const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', function(req, res){
    res.send('Welcome to the Hotel')
})


// import router files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

// use the routers
app.use('/person', localAuthMiddleware, personRoutes)
app.use('/menu', menuRoutes)



app.listen(PORT, () => [
    console.log('listening on port 3000')
])