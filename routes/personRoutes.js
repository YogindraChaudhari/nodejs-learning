const express = require('express')
const router = express.Router()
const Person = require('../models/Person')
const {jwtAuthMiddleware, generateToken} = require('../jwt')


// POST route to add a person
router.post('/signup', async (req, res) => {
    try{

        const data = req.body //Assuming the request body contains the person data

        // Create a new Person document using the Mongoose Model
        const newPerson = new Person(data)

        // Save the new person to the database
        const response = await newPerson.save()
        console.log('data saved')

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload))
        const token = generateToken(payload)
        console.log("Token is: ", token)

        res.status(200).json({response: response, token: token})

    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
    
})

// Login Route
router.post('/login', async(req, res) => {
    try {
        // Extract username and password from request body
        const {username, password} = req.body

        // Find the user by user
        const user = await Person.findOne({username: username})

        // if user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password)) ){
            return res.status(401).json({error: 'Invalid username and password'})
        }

        // generate token
        const payload = {
            id : user.id,
            username : user.username
        }

        const token = generateToken(payload)

        // return token as response
        res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user
        console.log('User Data: ', userData)

        const userId = userData.id
        const user = await Person.findById(userId)
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})


// GET method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try{
        const data = await Person.find()
        console.log('data fetched')
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})


// parameterized url
router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType //Extract the work type from the url parameter
        if(workType === 'chef' || workType === 'manager' || workType === 'waiter'){
            const response = await Person.find({work: workType})
            console.log('response fetched')
            res.status(200).json(response)
        }else{
            res.status(200).json({error: 'Invalid worktype'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id //Extract the id from the URL parameter
        const updatedPersonData = req.body //Updated data for the person 

        
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true, //Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person Not Found'})
        }

        console.log('data updated')
        res.status(200).json({message: 'Data Updated Successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id //Extract the id from the URL parameter
        const response = await Person.findByIdAndDelete(personId)

        if(!response){
            return res.status(404).json({error: 'Person Not Found'})
        }

        console.log('data deleted')
        res.status(200).json({message: 'Person Deleted Successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router