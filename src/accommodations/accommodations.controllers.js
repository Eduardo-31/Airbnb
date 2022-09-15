const uuid = require('uuid')

const Accommodations = require("../models/accommodations.model")
const Places = require("../models/places.model")
const Roles = require('../models/roles.model')
const Users = require("../models/user.model")


const getAllAccommodations = async() => {
    const data = await Accommodations.findAll({
        include: [
            {
                model: Users,
                as: 'user',
                attributes: {
                    exclude: ["createdAt", "updatedAt","password"]
                },
                include: {
                    model: Roles,
                    attributes: ["name"]
                }
            },
            {
                model: Places,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt", "placeId", "hostId"]
        }
    })

    return data
}


const createAccommodation = async(hostId,placeId, data) => {
    const response = await Accommodations.create({
        ...data,
        id: uuid.v4(),
        hostId,
        placeId
    })
    return response
}


const getAccommodationById = async(id) => {
    const data = await Accommodations.findOne({
        where: {
            id
        },
        include:[ {
            model: Places,
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        },{
            model: Users,
            as: "user",
            attributes: {
                exclude: ["createdAt", "updatedAt","password"]
            }
        }
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt", "placeId", "hostId"]
        }
    })
    return data
}


const deleteAccommodationsById = async(id) => {

        const data = await Accommodations.destroy({
            where: {
                id
            }
        })
        return data

}



const deleteMyAccommodationById = async(accommodationId,userId) => {

        const data = await Accommodations.destroy({
            where: {
                id: accommodationId,
                hostId: userId
            }
        })
        return data
    
}

const updateAccommodationsById = async(accommodationsID, data) => {

        const {id, hostId, placeId, ...newData } = data
        const response = await Accommodations.update({
            ...newData
        },{
            where:{
                id: accommodationsID
            }
        })
        return response
    
}


const updateMyAccommodationById = async(accmmodationsID, userID, data) => {

        const {id, hostId, placeId, ...newData } = data
        const response = await Accommodations.update({
            ...newData
        },{
            where:{
                id: accmmodationsID,
                hostId: userID
            }
        })
        return response
}

const getMyAccommodationsById = async(hostId) => {
    const data = await Accommodations.findAll({
        where: {
            hostId
        }
    })
    return data
}


const getByIdMyAccommodation = async(userId, accommodationsId) => {
    const response = Accommodations.findOne({
        where: {
            id: accommodationsId,
            hostId: userId
        },
        include:[ {
            model: Places,
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        },{
            model: Users,
            as: "user",
            attributes: {
                exclude: ["createdAt", "updatedAt","password"]
            }
        }
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt", "placeId", "hostId"]
        }
    })
    return response
}


module.exports = {
    getAllAccommodations,
    getAccommodationById,
    createAccommodation,
    deleteAccommodationsById,
    deleteMyAccommodationById,
    updateMyAccommodationById,
    updateAccommodationsById,
    getMyAccommodationsById,
    getByIdMyAccommodation
}