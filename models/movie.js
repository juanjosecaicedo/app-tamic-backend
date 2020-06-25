const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "tbl_streamings", {
    streaming_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    duration: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    popularity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img_streaming: {
      type: Sequelize.STRING,
    },
    img_banner: {
      type: Sequelize.STRING,
    },
    url_trailer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url_streaming: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    tbl_types_type_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tbl_countries_country_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    timestamps: false
  }
);
