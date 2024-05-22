const express = require('express')
const router = express.Router()
const MenuItem = require('../models/MenuItem')

// Post method to add a Menu
router.post('/', async (req, res) => {
    try{
        const data = req.body
        const newMenu = new MenuItem(data)
        const response = await newMenu.save()
        console.log('data saved')
        res.status(200).json(response)

    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find()
        console.log('data fetched')
        res.status(200).json(data)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// parameterized url
router.get('/:tasteType', async(req, res) => {
    try {
        const tasteType = req.params.tasteType //Extract the taste type from the url parameter
        if(tasteType === 'Sweet' || tasteType === 'Spicy' || tasteType === 'Sour'){
            const response = await MenuItem.find({taste: tasteType})
            console.log('response fetched')
            res.status(200).json(response)
        }else{
            res.status(200).json({error: 'Invalid taste'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuid = req.params.id //Extract the id from the URL parameters
        const updatedMenuData = req.body //Updated data for the menu

        const response = await MenuItem.findByIdAndUpdate(menuid, updatedMenuData, {
            new: true, //Return the updated documents
            runValidators: true, //Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Menu Not Found'})
        }

        console.log(response)
        res.status(500).json({message: 'Menu Updated Successfully'})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuid = req.params.id
        const response = await MenuItem.findByIdAndDelete(menuid)

        if(!response){
            res.status(404).json({error: "Menu Not Found"})
        }

        console.log(response)
        res.status(200).json({message: 'Menu Deleted Successfully'})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = router