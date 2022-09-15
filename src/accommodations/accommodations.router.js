const router = require('express').Router()
const passport = require('passport')

const accommodationsServices = require('./accommodations.http')
const reservationServices = require('../reservations/reservations.http')
const { roleAdminMiddleware, roleHostMiddleware } = require('../middlewares/adminRole')
require('../middlewares/auth.middleware')(passport)



router.route('/')
    .get(accommodationsServices.getAll)
    .post(passport.authenticate('jwt', {session: false}),roleHostMiddleware, accommodationsServices.createAccommodation)

    router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),accommodationsServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, accommodationsServices.deleteById)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware , accommodationsServices.updateById)
    
    router.route('/:id/make-reservation')



    .post(passport.authenticate('jwt', {session: false}), roleHostMiddleware, reservationServices.postReservation)



exports.router = router