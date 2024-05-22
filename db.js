const { connect } = require('http2')
const mongoose = require('mongoose')
require('dotenv').config()

// define the mongoDB connection URL.
// const mongoURL = 'mongodb://localhost:27017/hotels'
// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL

// Set-up mongoDB connection.
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object reperesenting the mongoDB connection.
const db = mongoose.connection

// Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server')
})

db.on('error', (err) => {
    console.log('MongoDB connection error', err)
})

db.on('disconnected', () => {
    console.log('MongoDB server disconnected')
})

// Export the database connection
module.exports = db //db defines MongoDB connection