const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const Accommodations = db.define('accommodations', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    guests: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bathrooms: {
        //type: DataTypes.FLOAT,
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    hostId: {
        //foreingKet: true,
        type: DataTypes.UUID,
        allowNull: false,
        field: 'host_id'
    },
    score: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    placeId: {
        foreingKet: true,
        type: DataTypes.UUID,
        allowNull: false,
        field: 'place_id'
    },
    comision: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active",
    },
})

module.exports = Accommodations