// router
const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware, roleHostMiddleware } = require('../middlewares/adminRole')
require('../middlewares/auth.middleware')(passport)

const userhttp = require('./users.http')
const accommodationServices = require('../accommodations/accommodations.http')

router.route('/')
    .get(userhttp.getAll)
     

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}),userhttp.updateMyUser)
    .get(passport.authenticate('jwt',{session: false}),userhttp.getMyUser)
    .delete(passport.authenticate('jwt',{session: false}),userhttp.deleteMyUser)
   

        // GET - obtener todos mis accommodations de mi cuenta
    router.route('/me/accommodations')
        .get(passport.authenticate('jwt',{session: false}), roleHostMiddleware, accommodationServices.getMyAccommodations)
        
        // PUT - editar un accommodation en especifico de mi cuenta
        // DELETE - eliminar un accommodation en especifico de mi cuenta
        // GET - obtener un accommodation en especifico de mi cuenta
    router.route('/me/:id/accommodation')    
        .put(passport.authenticate('jwt',{session: false}), roleHostMiddleware, accommodationServices.updateMyAccommodation)
        .delete(passport.authenticate('jwt',{session: false}), roleHostMiddleware, accommodationServices.deleteMyAccommodation)
        .get(passport.authenticate('jwt',{session: false}), roleHostMiddleware, accommodationServices.getByIdMyAccommodation)
    

router.route('/:id')
    .get(passport.authenticate('jwt',{session: false}), userhttp.getById)
    .delete(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, userhttp.remove)
    .put(passport.authenticate('jwt',{session: false}), roleAdminMiddleware, userhttp.update)

router.route('/:id/role')
    .get(userhttp.getUserRole)





exports.router = router