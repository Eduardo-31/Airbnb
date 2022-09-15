const accommodationsControllers = require('./accommodations.controllers')


const getAll = (req, res) => {
    accommodationsControllers.getAllAccommodations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => res.status(400).json(err))
}

const getById = (req, res) => {
    const id = req.params.id
    accommodationsControllers.getAccommodationById(id)
        .then(response => {
            if(response){
                res.status(201).json(response)
            }else{
                res.status(404).json({invalid: 'Invalid ID'})
            }
        })
        .catch(err => res.status(400).json(err))
}

const deleteById = (req, res) => {
    const id = req.params.id
    accommodationsControllers.deleteAccommodationsById(id)
        .then(response => {
            if(response){
                res.status(204).json()
            }else{
                res.status(400).json({messsage: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}



const createAccommodation = (req, res) => {
    const data = req.body
    const userId = req.user.id
    const placeId = req.params.id
    accommodationsControllers.createAccommodation(userId, placeId, data)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


const updateById = (req, res) => {
    const accommodationsId = req.params.id
    const data = req.body
    accommodationsControllers.updateAccommodationsById(accommodationsId, data)
        .then(response => {
            if(response !== null){
                res.status(200).json(response)
            }else{
                res.status(400).json('Invalid ID')
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const updateMyAccommodation = (req, res) => {
    const accommodationsId = req.params.id
    const userId = req.user.id
    const data = req.body
    accommodationsControllers.updateMyAccommodationById(accommodationsId, userId, data)
        .then(response => {
            if(response !== null){
                res.status(200).json(response)
            }else{
                res.status(400).json('Invalid ID')
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getMyAccommodations = (req, res) => {
    const id =  req.user.id
    accommodationsControllers.getMyAccommodationsById(id)
    .then(response => {
        if(response){
            res.status(201).json(response)
        }else{
            res.status(404).json({invalid: 'Invalid ID'})
        }
    })
    .catch(err => res.status(400).json(err))

}

const deleteMyAccommodation = (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    accommodationsControllers.deleteMyAccommodationById(id, userId)
        .then(response => {        
            if(response){
                res.status(204).json()
            }else {
                res.status(400).json({message: 'Invalid ID'})
            }         
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


const getByIdMyAccommodation = (req, res) => {
    const accommodationId = req.params.id
    const userId = req.user.id
    accommodationsControllers.getByIdMyAccommodation(userId, accommodationId)
        .then(response => {
            if(response){
                res.status(201).json(response)
            }else{
                res.status(404).json({invalid: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


module.exports = {
    getAll,
    getById,
    deleteById,
    createAccommodation,
    updateById,
    updateMyAccommodation,
    getMyAccommodations,
    deleteMyAccommodation,
    getByIdMyAccommodation
}