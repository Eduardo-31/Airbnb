const router = require('express').Router()
const reservationServices = require('./reservations.http')
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const { roleAdminMiddleware } = require('../middlewares/adminRole')


router.route('/')
    .get(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, reservationServices.getAll)
    
router.route('/me')
    .get(passport.authenticate('jwt',{session: false}), reservationServices.getAllMy)


router.route('/me/:id')
    .get(passport.authenticate('jwt',{session: false}),  reservationServices.getMyById)
    .put(passport.authenticate('jwt',{session: false}), reservationServices.edit)
    .delete(passport.authenticate('jwt',{session: false}), reservationServices.remove)


router.route('/:id')

.get(passport.authenticate('jwt',{session: false}), roleAdminMiddleware,  reservationServices.getById)

exports.router = router 