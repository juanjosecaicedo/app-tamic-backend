const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "tbl_codes", {
    code_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    commission: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    discount: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    expiration_date: {
      type: Sequelize.STRING,
      allowNull: true,
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
    },
    tbl_plans_plan_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tbl_types_type_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tbl_users_user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  }
);
