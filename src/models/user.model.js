const { DataTypes } = require('sequelize')

const { db } = require('../utils/database')

const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "first_name",
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "last_name",
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(40),
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      birthdayDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: "birthday_date",
      },
      dni: {
        type: DataTypes.STRING,
      },
      // si el nombre de tu table es roles no puedes asignarle como propiedad role, genraria conflicto
      // al ponerlo ya que la tabla tendria el mismo nombre solo que en plural (Roles) y tu propiedad en singural (rol)
      roleId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'role_id'
      },
      address: {
        type: DataTypes.STRING,
      },
      profileImage: {
        type: DataTypes.STRING,
        field: "profile_image",
        validate: {
          isUrl: true
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "active", //active, non-active, deleted, suspended
      },
      verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    
})

module.exports = Users
