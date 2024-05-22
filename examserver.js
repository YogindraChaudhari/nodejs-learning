const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.send('Three magestic Trio')
})

app.get('/r7', function(req, res){
    res.send('Hello I am Cristiano Ronaldo, Siuuuuuuuu.......')
})

app.get('/m10', function(req, res){
    const attribute = {
        name: 'Lionel Messi',
        status: 'GOAT',
        country: 'Argentina',
        club: 'Inter Miami',
        legend: 'Barcelona',
    }
    res.send(attribute)
})

app.get('/n10', function(req, res){
    res.send('Neymar Junior Everybody....!')
})

app.post('/g9', function(req, res){
    res.send('Looser')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})