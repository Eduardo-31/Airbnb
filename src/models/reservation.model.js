const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");



const Reservations = db.define('reservations', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        foreignKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        field: 'user_id'
    },
    arrival: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    departure: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    accommodationId: {
        foreignKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        field: 'accommodation_id'
    },
    adults: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    kids: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    babies: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    pets: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    score: {
        //type: DataTypes.FLOAT
        type: DataTypes.DECIMAL
    },
    isFinished: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_finished'
    },
    isCanceled: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        fiels: 'is_canceled'
    }
})

module.exports = Reservations