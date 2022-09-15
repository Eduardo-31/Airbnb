const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const AccommodationsImage = db.define('accommodations_image', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    /*accommodations_id: {
        // foreingKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },*/
    accommodationId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: "accommodation_id",
      },
    url: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }
});

module.exports = AccommodationsImage