//* Dependencias
const express = require('express')
const passport = require('passport')
require('./middlewares/auth.middleware')(passport)


const { db } = require('./utils/database')
const initModels = require('./models/initModels')
const { defaultData } = require('./utils/defaultData')



// Archivos de rutas
const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router
const accommodationRouter = require('./accommodations/accommodations.router').router
const reservationRouter = require('./reservations/reservations.router').router

//* Configuraciones iniciales
const app = express()
require('dotenv').config()

const port = process.env.PORT

initModels()
db.authenticate()
    .then(() => console.log('Database Authenticated'))
    .catch(err => console.log(err))

db.sync({force: true})
.then(() => {
    console.log('Database synced')
    defaultData()
})
.catch(err => console.log(err))



// Esta configuracion es para habilitar el manejo del req.body
app.use(express.json())



app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/accommodations', accommodationRouter)
app.use('/api/v1/reservations', reservationRouter)



app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})



exports.app = app
module.exports = app