const Accommodations = require("./accommodations.model");
const Accommodations_image = require("../models/users_images.model");
const Places = require("./places.model");
const Reservations = require("./reservation.model");
const Users = require("./user.model");
const Roles = require("./roles.model");
const UserImages = require("./users_images.model")

const initModels = () => {
    // belongTo = pertenece a
    // belongToMany = pertenecen a muchos
    // hasOne   = tiene uno
    // hasMany  = tiene muchos
    // A.hasOne(B)
    // has hace referencia cuando en el B existe la llave foranea
    // A.belongsTo(B)
    // belongs hace referencia cuando en A existe la llave foranea

    Users.belongsTo(Roles /*,{ foreignKey: {name: "role_id", allowNull:false}}*/)
    Roles.hasMany(Users)

    UserImages.belongsTo(Users)
    Users.hasMany(UserImages)

    // Users.belongsToMany(Accommodations, { through: Reservations })
    // Accommodations.belongsToMany(Users, {  through: Reservations})

    Users.hasMany(Reservations)
    Reservations.belongsTo(Users)

    Accommodations.hasMany(Reservations)
    Reservations.belongsTo(Accommodations)

    Accommodations_image.belongsTo(Accommodations)
    Accommodations.hasMany(Accommodations_image)

    //Accommodations.belongTo(Places)
    //Places.hasOne(Accommodations)

    Accommodations.belongsTo(Places)
    Places.hasMany(Accommodations)

    Users.hasMany(Accommodations, { foreignKey: "hostId"})
    Accommodations.belongsTo(Users,{ foreignKey: "hostId"})
}

module.exports = initModels


// belongTo = pertenece a
// belongToMany = pertenecen a muchos
// hasOne   = tiene uno
// hasMany  = tiene muchos


/*

    Users.belongTo(roles)
    Roles.hasMany(Users)

*/