const uuid = require('uuid')
const Accommodations = require('../models/accommodations.model')
const Reservations = require("../models/reservation.model")
const Roles = require('../models/roles.model')
const Users = require('../models/user.model')


const getAllReservations = async() => {

    const data = await Reservations.findAll({
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"]
                }
            },
            {
                model: Accommodations
            },
            {
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            }
        ]
    })
    return data
}

const createReservations = async(data, userId, accommodationId) => {
    const {isFinished, isCanceled, ...restOfData} = data
    const newReservation = await Reservations.create({
        ...restOfData,
        id: uuid.v4(),
        userId: userId,
        accommodationId: accommodationId,
    })
    return newReservation
}


const getReservationById = async (reservationId, userId, roleId) => {

    const res = await Roles.findOne({where: {name: "admin"}})

    if (roleId === res.id) {
      const data = await Reservations.findOne({
        where: {
          id: reservationId,
        }
      })
      return data
    } else {
        const data = await Reservations.findOne({
          where: {
            id: reservationId,
            userId,
          }
        })
        return data
    }
  }

  const getAllMyReservation = async (userId) => {
    const data = await Reservations.findAll({
        where: {
          userId,
        }
      })
      return data
  }

  const getMyReservationById = async(reservationId, userId) => {
    const data = await Reservations.findOne({
      where: {
        id: reservationId,
        userId,
      }
    })
    return data
  }


const deleteReservation = async (reservationId, userId) => {
    const host = await Accommodations.findOne({
        where: {
            hostId: userId,
        }
    })
    if(host.hostId === userId){
        const data = await Reservations.destroy({
            where: {
                id : reservationId
            }
        })
        return data
    } else {
        const data = await Reservations.destroy({
            where: {
                id : reservationId,
                userId: userId
            }
        })
        return data
    }
}


const editReservation = async (data, userId, reservationId) => {
    const {id, ...restOfData} = data

    const response = await Reservations.update(restOfData, {
        where: {
            userId,
            id: reservationId,
        }
    })

    return response
}



module.exports = {
    getAllReservations,
    createReservations,
    getReservationById,
    getAllMyReservation,
    getMyReservationById,
    deleteReservation,
    editReservation
}